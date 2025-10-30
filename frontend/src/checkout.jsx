import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useReceipt } from "./receiptContext";

const Checkout = ({ data, setIsCheckoutTabClose }) => {
  const { setReceiptData, receiptData } = useReceipt();

  const navigate = useNavigate();

  const handleCheckout = async (values) => {
    try {
      const checkout = await axios.post("http://localhost:8000/api/checkout", {
        name: values.name,
        email: values.email,
        cartItems: data,
      });

      setReceiptData(checkout.data.receipt);
      navigate("/receipt");
      toast.success("Checkout  sucessfull");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout not sucessfull");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <div className="fixed top-0 h-screen w-screen  z-20 backdrop-blur-2xl flex justify-center items-center">
      <div className="bg-white  px-6 py-10 h-[500px] w-[400px] shadow-2xl border relative">
        <ImCross
          className="absolute right-5 top-5 cursor-pointer"
          onClick={() => setIsCheckoutTabClose(true)}
        />
        <div className="w-full text-center text-4xl italic ">Checkout</div>
        <Formik
          initialValues={{ name: "", email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleCheckout}
        >
          {({ isValid, dirty }) => (
            <Form className="flex flex-col gap-4 max-w-sm mx-auto mt-10  h-full ">
              <div>
                <div className="px-3">Name</div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Please enter your name..."
                  className="border border-gray-300 rounded-md px-3 py-2  w-full"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <div className="px-3">Email</div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Please enter your email..."
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={!isValid || !dirty}
                className={`mt-24 py-2 rounded-md text-white ${
                  !isValid || !dirty
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Checkout
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Checkout;
