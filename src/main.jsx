import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

// javascript-time-ago initialztion

import TimeAgo from 'javascript-time-ago';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

import ReactGA from 'react-ga4';

// INITIALIZE GOOGLE ANALYTICS USING REACT-GA4
ReactGA.initialize(import.meta.env.VITE_GA_ID);

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

// import redux store
import { store } from './app/store';
import { Provider } from 'react-redux';

// import components for Authentication
import {
  // FORGOT PASSWORD FLOW
  ForgotPassword,
  EnterOtp,
  ResetPassword,

  // AUTH FLOW
  LoginLayout,
  Login,
  AuthLayout,
  Register,

  // VERIFY EMAIL FLOW
  VerifyEmail,
} from './pages/auth';

import Landing from './pages/landing/landing';

import Layout from './pages/dashboard/layout/layout';
import Editprofile from './pages/dashboard/pages/account/profileEdit/editprofile';
import Resetpass from './pages/dashboard/pages/account/resetpassword/resetpass';
import DeactivateAcc from './pages/dashboard/pages/account/deactivateaccount/deactivateAcc';
import Myprojects from './pages/dashboard/pages/account/myprojects/myprojects';
import Picturechange from './pages/dashboard/pages/account/changeprofilepicture/picturechange';

//import error component
import Error from './pages/error/error';

// import dashboard pages from layout
import {
  Community,
  Feed,
  Bookmarks,
  Account,
  Notifications,
  Contributors,
  Resources,
  Topics,
  Circle,
  Quiz,
  Users,
  // subpages of community
  Questionpage,
  AskQuestionPage,
  EditQuestionPage,

  // subpages of feed
  Createpost,
  Postpage,
} from './pages/dashboard/pages';
import Updatebio from './pages/dashboard/pages/account/updatebio/updateBio';
import UserProfile from './pages/dashboard/pages/users/userProfile/userProfile';

// set up router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: '/account',
    element: <AuthLayout />,
    // loader: () => {
    //   if (JSON.parse(localStorage.getItem('user'))?.user.emailIsVerified) {
    //     return redirect('/dashboard')
    //   } else {
    //     return redirect('/account/verifyemail')
    //   }
    // },
    children: [
      {
        path: '/account/login',
        element: <LoginLayout />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: '/account/login/forgotpassword',
            element: <ForgotPassword />,
          },
          {
            path: '/account/login/forgotpassword/enterotp',
            element: <EnterOtp />,
          },
          {
            path: '/account/login/forgotpassword/resetpassword',
            element: <ResetPassword />,
          },
        ],
      },
      {
        index: true,
        element: <Register />,
      },
    ],
  },
  {
    path: '/account/verifyemail',
    element: <VerifyEmail />,
  },
  {
    path: '/dashboard',
    element: <Layout />,
    errorElement: <Error />,
    loader: () => {
      if (!localStorage.getItem('user')) {
        return redirect('/account/login');
      }
      return null;
    },
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: '/dashboard/post/:postId',
        element: <Postpage />,
      },
      {
        path: '/dashboard/community',
        element: <Community />,
      },
      // dynamic route for for each question
      {
        path: '/dashboard/community/question/:questionId/:slug',
        element: <Questionpage />,
        // pass the question id as a prop to the component
        // this is used to fetch the question from the backend
        // and display it
      },
      {
        path: '/dashboard/community/ask',
        element: <AskQuestionPage />,
      },
      {
        path: '/dashboard/community/editquestion',
        element: <EditQuestionPage />,
      },
      {
        path: '/dashboard/bookmarks',
        element: <Bookmarks />,
      },
      {
        path: '/dashboard/account',
        element: <Account />,
        children: [
          {
            path: '/dashboard/account/myprojects',
            element: <Myprojects />,
          },
          {
            path: '/dashboard/account/editprofile',
            element: <Editprofile />,
          },
          {
            path: '/dashboard/account/resetpassword',
            element: <Resetpass />,
          },
          {
            path: '/dashboard/account/deactivateaccount',
            element: <DeactivateAcc />,
          },
          {
            path: '/dashboard/account/updateprofilepicture',
            element: <Picturechange />,
          },
          {
            path: '/dashboard/account/updatebio',
            element: <Updatebio />,
          },
        ],
      },

      {
        path: '/dashboard/contributors',
        element: <Contributors />,
      },
      {
        path: '/dashboard/notifications',
        element: <Notifications />,
      },
      {
        path: '/dashboard/resources',
        element: <Resources />,
      },
      {
        path: '/dashboard/topics',
        element: <Topics />,
      },
      {
        path: '/dashboard/circle',
        element: <Circle />,
      },
      {
        path: '/dashboard/quiz',
        element: <Quiz />,
      },
      {
        path: '/dashboard/users',
        element: <Users />,
      },
      {
        path: '/dashboard/users/:userId',
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
