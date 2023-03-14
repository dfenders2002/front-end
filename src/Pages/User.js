import React, { useState, useEffect, useRef } from "react";
import { Box } from '@mui/material';
import AddActivity from '../components/AddActivity';
import Schedule from '../components/Schedule';
import { fetchAll, fetchById } from "../api";
import { create } from '../api'
import ModalPopUp from '../components/ModalPopUP';
import { calculateTotalHours, totalHoursLastWeek } from "../Services/HelperFunctions";
import emailjs from '@emailjs/browser';
import toast, { Toaster } from "react-hot-toast";

export default function User() {
    const [activityEvents, setActivityEvents] = useState([]);

    const context = JSON.parse(window.sessionStorage.getItem('context'));
    const userId = context.userId;
    var hourCheck = false;

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [title, setTitle] = useState([]);
    const [subTitle, setSubTitle] = useState([]);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        const getActivities = async () => {
            const activities = await fetchAll('Activities?userId=', userId);

            //test
            const user = await fetchById('Users', userId);
            setUserName(user.name);
            setEmail(user.email);

            if (hourCheck === false) {
                checkHoursUserLastWeek(activities, userId);
            }
            const events = activities.map(activity => ({
                title: activity.description,
                start: new Date(activity.startTime),
                end: new Date(activity.endTime)
            }));
            setActivityEvents(events);
        }
        getActivities();
    }, [userId]);

    const handleAddActivity = async (newActivityObj) => {
        await create('Activities', newActivityObj).then(toast.success('Successfully added activity!'));

        calculateHours(newActivityObj)

        const updatedActivity = {
            title: newActivityObj.description,
            start: new Date(newActivityObj.startTime).setHours(new Date(newActivityObj.startTime).getHours() - 1),
            end: new Date(newActivityObj.endTime).setHours(new Date(newActivityObj.endTime).getHours() - 1)
        };

        setActivityEvents((prevActivities) => {
            const updatedActivities = [...prevActivities, updatedActivity];
            return updatedActivities;
        });
    };


    //als je minder uur gewerkt hebt dan je gecontracteerde uren
    async function checkHoursUserLastWeek(activities, userId) {
        const hoursLastWeek = totalHoursLastWeek(activities);
        const user = await fetchById('Users', userId);
        hourCheck = true;
        if (hoursLastWeek < user.workTime) {
            sendEmail()
            setTitle('Bro je werkt te weinig');
            setSubTitle('Je hebt vorige week ' + hoursLastWeek.toFixed(1) + ' uur gewerkt, van de ' +  user.workTime.toFixed(1) + ' . er is hierom tot onze teleurstelling een mail naar je verstuurd! ');
            setIsModalOpen(true);
        }
    }


    //check op meer dan 8 uur
    function calculateHours(newActivityObj) {
        const start = new Date(newActivityObj.startTime);
        const end = new Date(newActivityObj.endTime);

        const diffInMs = end.getTime() - start.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);
        const roundedDiff = diffInHours.toFixed(1);
        if (roundedDiff > 8) {
            //Text voor modal
            setTitle('Dit is meer dan 8 uur op 1 dag!!!');
            setSubTitle('Drink genoeg koffie, pak wat pre workout, klaar een goeie gym sessie, ga lekker wat koken, geef je brein wat rust. Meer dan 8 uur op 1 dag is veel , doe rustig aan strijder!');
            setIsModalOpen(true);
        }
    }

    const form = useRef();

    async function sendEmail() {
        emailjs.sendForm('service_ojsnnsr', 'template_c4wrbve', form.current, 'coM9URop3iNLrAg2C')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <Box sx={{ padding: '40px' }}>
            <div><Toaster/></div>
            <ModalPopUp open={isModalOpen} setOpen={setIsModalOpen} title={title} subTitle={subTitle} />
            <AddActivity onAddActivity={handleAddActivity} />
            <Schedule activityEvents={activityEvents} />
            <form style={{ display: 'none' }} ref={form}>
                <input type="text" id="userNameInput" name="user_name" defaultValue={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="email" id="userEmailInput" name="user_email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                <textarea name="message" defaultValue={"Tot onze teleurstelling zijn we er achter gekomen dat je deze week te weinig uren hebt gemaakt :( harder werken!!"} />
            </form>
        </Box>
    );
}