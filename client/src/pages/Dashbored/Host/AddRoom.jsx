import { useState } from "react";
import AddRoomForm from "../../../components/Dashboared/Sidebar/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import {useMutation} from '@tanstack/react-query'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddRoom = () => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const axiosSecure = useAxiosSecure()
  const { user } = useAuth();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });
  const [imagePreview, setImagePreview] = useState()
  const [imageText, setImageText] = useState('Upload Image')
  //Date range handler
  const handleDates = (item) => {
    console.log(item);
    setDates(item.selection);
  };


  const {mutateAsync} = useMutation({
mutationFn: async (roomData)=>{
    const {data} = await axiosSecure.post(`/room`,roomData)
    return data
},
onSuccess:()=>{
    console.log("Data Saved Successfully")
    toast.success('Room Added Successfully!')
    navigate('/dashboard/my-listings')
    setLoading(false)
}

  })

  // Form handler
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const price = form.price.value;
    const guest = form.total_guest.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const bedrooms = form.bedrooms.value;
    const image = form.image.files[0];
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    try {
      const image_url = await imageUpload(image);

      const roomData = {
        location,
        category,
        title,
        to,
        from,
        price,
        guest,
        bedrooms,
        bathrooms,
        host,
        description,
        image: image_url,
      }

      console.table(roomData)

    //   post request to server
    await mutateAsync(roomData)
    } catch (err) {
      console.log(err.message);
      toast.error(err.message)
      setLoading(false)
    }
    // console.log(image_url);
  };






//   handle img change
const handleImage = image =>{
    setImagePreview(URL.createObjectURL(image))
    setImageText(image.name)
}
  return (
    <div>
      <h1>Add Room Page</h1>
{/* show image text */}

      {/* Form */}
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
      />
    </div>
  );
};

export default AddRoom;
