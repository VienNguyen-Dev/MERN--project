import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);

        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        setLandlord(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchLandlord();
  }, [listing.userRef]); //thay doi thong tin listing theo tung nguoi dung

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username} </span>
            for <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea className="w-full border rounded-lg p-3" name="message" id="message" rows="2" value={message} onChange={onChange} placeholder="Enter your message here..."></textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`} className="bg-slate-700 text-white roundef-lg p-3 hover:opacity-95 uppercase">
            Send message
          </Link>
        </div>
      )}
    </>
  );
}
