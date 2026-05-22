import React from "react";

const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
  return (
    <div>
      <h1 className="">User Number {id} here!</h1>
    </div>
  );
};

export default UserDetails;
