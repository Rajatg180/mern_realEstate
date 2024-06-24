import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation,Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import { ColorRing } from "react-loader-spinner";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation,Autoplay]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="font-sans">
      {loading && (
        <div className="flex mx-auto justify-center min-h-screen">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
            colors={["#64748b", "#64748b", "#64748b", "#64748b", "#64748b"]} // Slate color
          />
        </div>
      )}
      {error && (
        <p className="text-center text-slate-700 font-bold my-7 text-2xl">
          Something went wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation autoplay={{ delay: 2000, disableOnInteraction: false }}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] mx-10 my-10 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
                  style={{
                    background: `url(${url}) center`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:bg-slate-200 transition-all">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 shadow-lg">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-6 my-10 gap-6 bg-white rounded-lg shadow-xl">
            <p className="text-3xl font-bold text-gray-800">
              {listing.name} - ${" "}
              {listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-4 gap-2 text-gray-600 text-lg text-semibold">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4 mt-4">
              <p className="bg-red-500 w-full shadow-xl max-w-[200px] text-white text-center p-2 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-500 w-full max-w-[200px] text-white text-center p-2 rounded-md">
                  ${+listing.discountPrice} Discount
                </p>
              )}
            </div>
            <p className="text-gray-700 text-lg  mt-4">
              <span className="font-semibold text-lg text-gray-900">
                Description:
              </span>{" "}
              {listing.description}
            </p>
            <ul className="text-green-700 font-semibold text-base flex flex-wrap items-center gap-6 mt-4">
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-6"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
