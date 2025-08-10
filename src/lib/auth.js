import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user;
};

export const requireAuth = async (callback) => {
  const session = await getSession();
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return callback ? callback(session) : { props: { session } };
};

export const requireAdmin = async (callback) => {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return callback ? callback(session) : { props: { session } };
};
