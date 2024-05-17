'use client';

// withAuthRole.js
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const withAuthRole = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
      return //<p>Loading...</p>;
    }

    if (!session || !session.user || !session.user.role) {
      // Redirect or show error for unauthenticated users
      redirect('/restrictPage'); ;
    }

    const { role } = session.user;

    if (!allowedRoles.includes(role)) {
      // Redirect or show error for unauthorized roles
      redirect('/restrictPage');
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRole;
