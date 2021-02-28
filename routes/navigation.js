import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home'

import Student from '../screens/student/Student'
import StudentSignup from '../screens/student/Student Signup'
import StudentDashboard from '../screens/student/Student Dashboard'
import ViewStudentProfile from '../screens/student/View Student Profile'
import FindJobs from '../screens/student/Find Jobs'

import Company from '../screens/company/Company'
import CompanyDashboard from '../screens/company/Company Dashboard'
import ViewCompanyProfile from '../screens/company/View Company Profile'
import AddJob from '../screens/company/Add Job'
import CompanyJobs from '../screens/company/Company Jobs'
import StudentList from '../screens/company/Student List'

import Admin from '../screens/admin/Admin'
import AdminPanel from '../screens/admin/Admin Panel'
import ViewJobs from '../screens/admin/View Jobs'
import AddStudent from '../screens/admin/Add Student'
import ViewStudents from '../screens/admin/View Students'
import AddCompany from '../screens/admin/Add Company'
import ViewCompany from '../screens/admin/View Company'
import StudentProfile from '../screens/admin/Student Profile'
import CompanyProfile from '../screens/admin/Company Profile'
import JobDetails from '../screens/admin/Job Detais'

const Stack = createStackNavigator();
export default function HomeStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false,}}/>
                <Stack.Screen name="Admin" component={Admin} options={{headerShown: false,}}/>
                <Stack.Screen name="AdminPanel" component={AdminPanel} options={{headerShown: false,}}/>
                <Stack.Screen name="AddStudent" component={AddStudent} options={{headerShown: false,}}/>
                <Stack.Screen name="ViewStudents" component={ViewStudents} options={{headerShown: false,}}/>
                <Stack.Screen name="AddCompany" component={AddCompany} options={{headerShown: false,}}/>
                <Stack.Screen name="ViewCompany" component={ViewCompany} options={{headerShown: false,}}/>
                <Stack.Screen name="ViewJobs" component={ViewJobs} options={{headerShown: false,}}/>
                <Stack.Screen name="StudentProfile" component={StudentProfile} options={{headerShown: false,}}/>
                <Stack.Screen name="CompanyProfile" component={CompanyProfile} options={{headerShown: false,}}/>
                <Stack.Screen name="JobDetails" component={JobDetails} options={{headerShown: false,}}/>
 
                <Stack.Screen name="Company" component={Company} options={{headerShown: false,}}/>
                <Stack.Screen name="CompanyDashboard" component={CompanyDashboard} options={{headerShown: false,}}/>
                <Stack.Screen name="ViewCompanyProfile" component={ViewCompanyProfile} options={{headerShown: false,}}/>
                <Stack.Screen name="AddJob" component={AddJob} options={{headerShown: false,}}/>
                <Stack.Screen name="CompanyJobs" component={CompanyJobs} options={{headerShown: false,}}/>
                <Stack.Screen name="StudentList" component={StudentList} options={{headerShown: false,}}/>
 
                <Stack.Screen name="Student" component={Student} options={{headerShown: false,}}/>
                <Stack.Screen name="StudentSignup" component={StudentSignup} options={{headerShown: false,}}/>
                <Stack.Screen name="StudentDashboard" component={StudentDashboard} options={{headerShown: false,}}/>
                <Stack.Screen name="ViewStudentProfile" component={ViewStudentProfile} options={{headerShown: false,}}/>
                <Stack.Screen name="FindJobs" component={FindJobs} options={{headerShown: false,}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}