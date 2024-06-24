import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Update a Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder='Description'
            className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-4'>
            <div className='flex items-center'>
              <input
                type='radio'
                id='sale'
                className='mr-2'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <label htmlFor='sale'>Sell</label>
            </div>
            <div className='flex items-center'>
              <input
                type='radio'
                id='rent'
                className='mr-2'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <label htmlFor='rent'>Rent</label>
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='parking'
                className='mr-2'
                onChange={handleChange}
                checked={formData.parking}
              />
              <label htmlFor='parking'>Parking spot</label>
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='furnished'
                className='mr-2'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <label htmlFor='furnished'>Furnished</label>
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='offer'
                className='mr-2'
                onChange={handleChange}
                checked={formData.offer}
              />
              <label htmlFor='offer'>Offer</label>
            </div>
          </div>
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <label htmlFor='bedrooms' className='ml-2'>Beds</label>
            </div>
            <div className='flex items-center'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <label htmlFor='bathrooms' className='ml-2'>Baths</label>
            </div>
            <div className='flex items-center'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='400000000'
                required
                className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <label htmlFor='regularPrice' className='ml-2'>
                Regular price (USD)
              </label>
            </div>
            {formData.offer && (
              <div className='flex items-center'>
                <input
                  type='number'
                  id='discountPrice'
                  min='50'
                  max='400000000'
                  required
                  className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <label htmlFor='discountPrice' className='ml-2'>
                  Discount price (USD)
                </label>
              </div>
            )}
          </div>
          <div className='border p-3 rounded-lg'>
            <label htmlFor='images' className='block mb-2'>
              Images
            </label>
            <input
              type='file'
              id='images'
              accept='.jpg,.png,.jpeg'
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className='mb-4'
            />
            {imageUploadError && (
              <div className='text-red-600 mb-2'>{imageUploadError}</div>
            )}
            <button
              type='button'
              onClick={handleImageSubmit}
              className='py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
            <div className='grid grid-cols-3 gap-4 mt-4'>
              {formData.imageUrls.map((url, index) => (
                <div key={index} className='relative'>
                  <img src={url} alt={`Uploaded ${index + 1}`} className='rounded-lg' />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          {error && <div className='text-red-600'>{error}</div>}
          <button
            type='submit'
            className='py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            {loading ? 'Saving...' : 'Update Listing'}
          </button>
        </div>
      </form>
    </main>
  );
}
