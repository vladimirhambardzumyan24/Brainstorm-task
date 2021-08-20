import { useState } from "react";
import { useHistory } from "react-router-dom";
import { httpClient } from "../../service/axios.service";

export default function User({ user, onDelete }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const editThisUser = (id) => {
    history.push(`/user/${id}/edit`);
  };

  const deleteThisUser = async (id) => {
    setLoading(true);
    await httpClient.delete(`/users/${id}`);
    await onDelete(id);
    setLoading(false);
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={user.photo} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-12 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.location}</div>
      </td>
      <td className="px-12 py-4 whitespace-nowrap">
        <span className="px-12 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.registeredDate}
        </span>
      </td>
      <td className="px-12 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.lastActiveDate}
      </td>
      <td className="px-12 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => {
            editThisUser(user.id);
          }}
          className="text-gray-700 cursor-pointer hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium bg-blue-100"
        >
          Edit
        </button>
      </td>
      <td className="px-12 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => {
            deleteThisUser(user.id);
          }}
          className="text-gray-700 cursor-pointer hover:bg-red-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium bg-red-100"
        >
          Delete
        </button>
        {loading && "loading"}
      </td>
    </tr>
  );
}
