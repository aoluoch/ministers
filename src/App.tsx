import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import {
  fetchAboutPage,
  fetchContactPage,
  fetchEventBySlug,
  fetchFaqPage,
  fetchGetInvolvedPage,
  fetchHomePage,
  fetchProgramsPage,
} from '@/lib/contentful'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ProgramsPage } from '@/pages/ProgramsPage'
import { EventDetailPage } from '@/pages/EventDetailPage'
import { GetInvolvedPage } from '@/pages/GetInvolvedPage'
import { ContactPage } from '@/pages/ContactPage'
import { FaqPage } from '@/pages/FaqPage'

const router = createBrowserRouter([
  {
    element: <PageShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: () => fetchHomePage(),
      },
      {
        path: 'about',
        element: <AboutPage />,
        loader: () => fetchAboutPage(),
      },
      {
        path: 'programs',
        element: <ProgramsPage />,
        loader: () => fetchProgramsPage(),
      },
      {
        path: 'programs/:slug',
        element: <EventDetailPage />,
        loader: ({ params }) => fetchEventBySlug(params.slug ?? ''),
      },
      {
        path: 'get-involved',
        element: <GetInvolvedPage />,
        loader: () => fetchGetInvolvedPage(),
      },
      {
        path: 'contact',
        element: <ContactPage />,
        loader: () => fetchContactPage(),
      },
      {
        path: 'faq',
        element: <FaqPage />,
        loader: () => fetchFaqPage(),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
