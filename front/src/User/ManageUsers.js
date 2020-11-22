import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import minutesToHours from "../../lib/minutesToHours";
import Loading from "../helpers/Loading";
import Error from "../helpers/Error";
import EditAccountModal from "../Modals/EditAccountModal";
import CheckPermission from "./CheckPermission";

const USERS_QUERY = gql`
  query users($limit: Int!, $offset: Int!) {
    users(limit: $limit, offset: $offset) {
      _id
      username
      permissions
      preferredWorkTime
    }
  }
`;

const ManageUsers = () => {
  const [limit, setLimit] = useState(20); // Users per page
  const [offset, setoOffset] = useState(0); // Users offset

  const { data, error, loading } = useQuery(USERS_QUERY, {
    variables: { limit, offset },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="row pt-5">
      <div className="col-12">
        <EditAccountModal>
          {(showModal) => (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Daily work objective</th>
                  <th scope="col">Permissions</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{minutesToHours(u.preferredWorkTime)} hours</td>
                    <td>{u.permissions.join(", ")}</td>
                    <td>
                      <button
                        onClick={() => showModal(u._id)}
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fa fa-pencil" /> Edit
                      </button>
                      <CheckPermission permission="ADMIN">
                        <Link href={`calendar/${u._id}`}>
                          <a
                            className="btn btn-success ml-1 btn-sm"
                            title={`${u.username}'s calendar`}
                          >
                            <i className="fa fa-calendar-alt" /> Calendar
                          </a>
                        </Link>
                      </CheckPermission>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </EditAccountModal>
      </div>
    </div>
  );
};

export default ManageUsers;
