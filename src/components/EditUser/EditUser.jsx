import { useParams } from "react-router-dom";
import Navbar from "../Navigation/Navigation";

export default function EditUser() {
    const { id } = useParams()
  return (
    <>
      <Navbar />
      {id}
    </>
  );
}
