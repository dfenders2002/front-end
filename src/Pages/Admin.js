import React, { useState, useEffect } from 'react';
import AddUser from '../components/AddUser';
import AllUsers from '../components/AllUsers';
import { create, fetchAll } from '../api';
import { calculateTotalHours } from '../Services/HelperFunctions';
import toast, { Toaster } from 'react-hot-toast';

export default function Admin() {
  const [users, setUsers] = useState([]);

  // Huidige datum en tijd
  const now = new Date();
  // Bepaal het begin van de week (Maandag)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  // Bepaal het einde van de week (Zondag)
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() - now.getDay() + 7);
  
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit'
  };
  const startOfWeekText = startOfWeek.toLocaleDateString('nl-NL', options).replace(/\./g, '/');
  const endOfWeekText = endOfWeek.toLocaleDateString('nl-NL', options).replace(/\./g, '/');

  useEffect(() => {
    async function fetchData() {
      const allUsers = await fetchAll('Users');
      await Promise.all(allUsers.map(async (user) => {
        const activities = await fetchAll('Activities?userId=', user.id);
        user.totalWorkedHours = 0;
        if (activities.length !== 0) {

          //data van deze week ophalen
          const dataVanDeWeek = activities.filter(activity => {
            const activityDate = new Date(activity.startTime);
            return activityDate >= startOfWeek && activityDate <= endOfWeek;
          });

          //extra obj met datum in onze tijd
          dataVanDeWeek.forEach(activity => {
            const date = new Date(activity.startTime).toLocaleDateString('nl-NL', options).replace(/\./g, '/');
            activity.date = date;
          });

          user.activities = dataVanDeWeek;
          //uren ophalen
          const totalHours = calculateTotalHours(activities);
          user.totalWorkedHours = totalHours;
        }
      }));

      setUsers(allUsers);
    }

    fetchData();
  }, []);

  const handleAddUser = async (newUser) => {
    newUser.totalWorkedHours = 0;
    await create('Users', newUser).then(toast.success('Successfully added user!'));
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      return updatedUsers;
    });
  };

  return (
    <div>
      <div><Toaster/></div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <h1 style={{ marginLeft: '70px',fontSize: '52px', fontWeight: 'bold' }}>Datum: {startOfWeekText} - {endOfWeekText}</h1>
        <h1 style={{ fontSize: '52px', fontWeight: 'bold', margin: '0 20%' }}>Admin Panel</h1>
      </div>

      <AddUser onAddUser={handleAddUser} />
      <AllUsers users={users} />
    </div>
  );
}
