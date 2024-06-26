import { useEffect, useState } from "react";
import { Button,  Header,  Segment } from "semantic-ui-react";
import { useStore } from "../../../App/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivityFormValues } from "../../../App/models/activity";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { Formik, Form } from "formik";
import {v4 as uuid} from 'uuid';
import * as Yup from 'yup';
import MyTextInput from "../../../App/common/form/MyTextInput";
import MyTextArea from "../../../App/common/form/MyTextArea";
import MySelectInput from "../../../App/common/form/MySelectInput";
import { categoryOptions } from "../../../App/common/options/categoryOptions";
import MyDateInput from "../../../App/common/form/MyDateInput";


export default observer( function ActivityForm(){

    const {activityStore} = useStore();
    const {  createActivity,updateActivity,
       loadActivity,loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues);

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is requried'),
        description: Yup.string().required('The activity description is requried'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required'),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })
    useEffect(()=> {
        if(id) loadActivity(id).then(activity=> setActivity(new ActivityFormValues(activity)))
    },[id, loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues){
        if(!activity.id){
            let newActivity = {
                ...activity,
                id:uuid()
            };
            createActivity(newActivity).then(()=> navigate(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
        }
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity...'/>
    return(
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
        <Formik 
        validationSchema={validationSchema}
        enableReinitialize 
        initialValues={activity} 
        onSubmit={values => handleFormSubmit(values)}>
            {({ handleSubmit, isValid,isSubmitting,dirty})=> (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name="title" placeholder="Title"/>
                        <MyTextArea placeholder='Description' name='description' rows={3}/>
                        <MySelectInput placeholder='Category' name='category' options={categoryOptions} />
                        <MyDateInput 
                        placeholderText='Date' 
                        name='date' 
                        showTimeSelect
                        timeCaption="time"
                        dateFormat={'MMMM d, yyyy h:mm aa'}
                        />
                        <Header content='Location Details' sub color='teal'/>
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue'/>
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} 
                        floated='right' 
                        positive type='submit' 
                        content='Submit'

                        />
                        <Button as={Link} to={`/activities`} floated='right' type='button' content='Cancel'/>
                    </Form>
            )}
        </Formik>

        </Segment>
    )
})

