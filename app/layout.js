'use client'
import { Inter } from 'next/font/google'
import initMocks from '@/functions/initMocks.js';
import { AuthProvider } from '@/contexts/AuthContext';
import GlobalLayout from '@/components/GlobalLayout';
import delay from '@/functions/dalay.js';

if (process.env.NODE_ENV === 'development') {
  initMocks();
}

const inter = Inter({ subsets: ['latin'] })

const Layout = async ({ children }) => { 
  if (process.env.NODE_ENV === 'development') 
    await delay(1000);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>    
          <GlobalLayout>
            {children}
          </GlobalLayout>  
        </AuthProvider>
      </body>
    </html>     
  )
};

export default Layout;