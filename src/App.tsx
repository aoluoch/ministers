import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
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
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'programs', element: <ProgramsPage /> },
      { path: 'programs/:slug', element: <EventDetailPage /> },
      { path: 'get-involved', element: <GetInvolvedPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
