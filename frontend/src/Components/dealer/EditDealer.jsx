import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import "jquery-validation";
import { FaAngleDown } from "react-icons/fa6";

const EditDealer = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const initialState = {
    name: "",
    address: "",
    contact: { phone: "", email: "" },
    businessDetails: {
      registrationNumber: "",
      taxId: "",
      gstNumber: "",
    },
  };
  const [data, setData] = useState(initialState);
  useEffect(() => {
    fetchOldData();
  }, []);
  const fetchOldData = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getDealer/${id}`
    );
    const response = await res.json();
    console.log(response)
    if (response.success) {
      setData({
        ...data,
        name: response.result?.name,
        address: response.result?.address,
        contact: {
          phone: response.result?.contact?.phone,
          email: response.result?.contact?.email,
        },
        businessDetails: {
          registrationNumber:
            response.result?.businessDetails?.registrationNumber,
          taxId: response.result?.businessDetails?.taxId,
          gstNumber: response.result?.businessDetails?.gstNumber,
        },
      });
    }
  };
  const validateDealerForm = () => {
    $.validator.addMethod(
      "validPhone",
      function (value, element) {
        return this.optional(element) || /^[0-9]{10}$/.test(value); // Updated to allow only numeric values
      },
      "Please enter a valid 10-digit phone number."
    );

    $("#dealerForm").validate({
      rules: {
        name: { required: true },
        address: { required: true },
        "contact.phone": { required: true, validPhone: true },
        "contact.email": { required: true, email: true },
      },
      messages: {
        name: { required: "Please enter name" },
        address: { required: "Please enter address" },
        "contact.phone": {
          required: "Please enter mobile number",
          validPhone: "Phone number must be exactly 10 digits",
        },
        "contact.email": {
          required: "Please enter email",
          email: "Please enter a valid email address",
        },
      },
      errorElement: "div",
      errorPlacement: (error, element) =>
        error.addClass("invalid-feedback").insertAfter(element),
      highlight: (element) =>
        $(element).addClass("is-invalid").removeClass("is-valid"),
      unhighlight: (element) =>
        $(element).removeClass("is-invalid").addClass("is-valid"),
    });
    return $("#dealerForm").valid();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setData((prevData) => {
      let updatedData = { ...prevData };
      let temp = updatedData;

      // Traverse through keys to find the correct nested property
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }

      // Update the final property in the nested object
      temp[keys[keys.length - 1]] = value;

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateDealerForm()) {
      //setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoader(true);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/updateDealer/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const response = await res.json();
      if (response.success) {
        toast.success(" Dealer is updated Successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/dealers");
        }, 1500);
      } else {
        setLoader(false);
        setError(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  console.log(data);
  return (
    <>
      <div className="flex items-center ">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex items-center">
          <IoIosArrowRoundBack
            onClick={handleGoBack}
            className="bg-[#16144b] text-white rounded-sm text-[40px] cursor-pointer shadow-xl ml-5"
          />
        </div>
        <div className="flex items-center">
          <div className="text-2xl font-bold mx-2 my-8 px-4">Edit Dealer</div>
        </div>
      </div>
      {loader ? (
        <div className="absolute w-[80%] h-[40%] flex justify-center items-center">
          <div
            className=" flex justify-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="w-[70%] m-auto my-10">
          <form id="dealerForm">
            <div className="grid gap-6 mb-6 md:grid-cols-2 items-center">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Name
                  <span className="text-red-900 text-lg ">&#x2a;</span>
                </label>
                <input
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black block w-full p-2.5 "
                  placeholder="Warehouse name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Address
                  <span className="text-red-900 text-lg ">&#x2a;</span>
                </label>
                <input
                  name="address"
                  value={data.address}
                  onChange={handleChange}
                  type="text"
                  id="address"
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black block w-full p-2.5 "
                  placeholder="Address"
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="contact.phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Mobile number
                  <span className="text-red-900 text-lg ">&#x2a;</span>
                </label>
                <input
                  name="contact.phone"
                  value={data.contact.phone}
                  onChange={handleChange}
                  type="text"
                  id="contact.phone"
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black block w-full p-2.5 "
                  placeholder="Mobile number"
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="contact.email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Email addresss
                  <span className="text-red-900 text-lg ">&#x2a;</span>
                </label>
                <input
                  name="contact.email"
                  value={data.contact.email}
                  onChange={handleChange}
                  type="text"
                  id="contact.email"
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black block w-full p-2.5 "
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <h2 className="font-bold text-lg mt-8 mb-4">
              Bussiness Details -{" "}
            </h2>
            <div className="grid gap-6 mb-6 md:grid-cols-2 items-center">
              <div>
                <label
                  htmlFor="registrationNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Registration number
                </label>
                <input
                  name="businessDetails.registrationNumber"
                  value={data.businessDetails.registrationNumber}
                  onChange={handleChange}
                  type="text"
                  id="registrationNumber"
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black block w-full p-2.5 "
                  placeholder="Registration Number"
                />
              </div>
              <div>
                <label
                  htmlFor="taxId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Tax Id
                </label>
                <input
                  name="businessDetails.taxId"
                  value={data.businessDetails.taxId}
                  onChange={handleChange}
                  type="text"
                  id="taxId"
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black block w-full p-2.5 "
                  placeholder="Tax Id"
                />
              </div>
              <div>
                <label
                  htmlFor="gstNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  GST Number
                </label>
                <input
                  name="businessDetails.gstNumber"
                  value={data.businessDetails.gstNumber}
                  onChange={handleChange}
                  type="text"
                  id="gstNumber"
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black block w-full p-2.5 "
                  placeholder="GST Number"
                />
              </div>
            </div>
            {error && <p className="text-red-900  text-[17px] mb-5">{error}</p>}
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white bg-[#16144b] hover:bg-[#16144bea] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              UPDATE
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDealer;
