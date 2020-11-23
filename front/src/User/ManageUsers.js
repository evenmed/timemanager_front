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

const limit = 10; // Users to show per page

const ManageUsers = () => {
  const [offset, setOffset] = useState(0); // Users offset

  const { data, error, loading } = useQuery(USERS_QUERY, {
    variables: {
      limit: limit + 1, // We do this to check if we should show "next" btn
      offset,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  if (!data || !data.users || !data.users.length)
    return <Error error="No users found" />;

  const hasNextPage = data.users.length === limit + 1;

  const users = [...data.users];

  if (hasNextPage) users.pop();

  return (
    <div className="row pt-5">
      <div className="col-12">
        <EditAccountModal>
          {(showModal) => (
            <table className="table table-striped table-responsive-sm">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Daily work objective</th>
                  <th scope="col">Permissions</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{minutesToHours(u.preferredWorkTime)} hours</td>
                    <td>{u.permissions.join(", ")}</td>
                    <td className="p-1 text-center">
                      <button
                        onClick={() => showModal(u._id)}
                        className="btn btn-primary btn-sm m-1 text-nowrap"
                      >
                        <i className="fa fa-pencil" /> Edit
                      </button>
                      <CheckPermission permission="ADMIN">
                        <Link href={`calendar/${u._id}`}>
                          <a
                            className="btn btn-success m-1 btn-sm text-nowrap"
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
      <div className="col-12 text-center">
        <div className="btn-group" role="group" aria-label="Basic example">
          {offset > 0 && (
            <button
              onClick={() => setOffset(offset - limit)}
              type="button"
              className="btn btn-secondary"
            >
              <i className="fa fa-chevron-left"></i>
            </button>
          )}
          <span className="btn btn-secondary">
            Page {Math.round(offset / limit) + 1}
          </span>
          {hasNextPage && (
            <button
              onClick={() => setOffset(offset + limit)}
              type="button"
              className="btn btn-secondary"
            >
              <i className="fa fa-chevron-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
