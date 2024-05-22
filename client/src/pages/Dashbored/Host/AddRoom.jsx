import { useState } from "react";
import AddRoomForm from "../../../components/Dashboared/Sidebar/Form/AddRoomForm";



const AddRoom = () => {
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ])

    //Date range handler
    const handleDates = range =>{
        console.log(range)
        setDates(range.selection)
    }
    return (
        <div>
            <h1>Add Room Page</h1>


            {/* Form */}
            <AddRoomForm dates={dates} handleDates={handleDates}/>
        </div>
    );
};

export default AddRoom;