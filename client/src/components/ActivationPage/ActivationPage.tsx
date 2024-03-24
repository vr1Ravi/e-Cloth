import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [err, setErr] = useState(null);
  useEffect(() => {}, [activation_token]);

  return <div className="w-full h-[100vh]"></div>;
};

export default ActivationPage;
