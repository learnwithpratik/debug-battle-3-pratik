import { useState } from "react";
import { useHabit } from "../context/HabitContext";

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...habit });

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = (habit.completedDates || []).includes(today);

  const handleSave = () => {
    if (!editData.name || !editData.name.trim()) return;

    updateHabit(habit.id, editData);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <input
          value={editData.name}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
       
        <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-xl mt-4">
          {/* Top Row */}
          <div className="flex justify-between items-center">
            {/* Badges */}
            <div className="flex gap-2 text-xs font-medium">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {habit.category}
              </span>

              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">
                {habit.priority}
              </span>
            </div>

            {/* Streak */}
            <div className="text-right">
              <p className="text-lg font-semibold">0 ^^</p>
              <p className="text-xs text-gray-400">STREAK</p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold mt-2">{habit.name}</h2>

          {/* Motivation */}
          <p className="text-gray-400 text-sm mt-1 pl-3">
            {habit.motivation}
          </p>

          <hr className="my-3" />

          {/* Bottom Row */}
          <div className="flex justify-between items-center">
            {/* Goal */}
            <div>
              <p className="text-xs text-gray-400 uppercase">Goal</p>
              <p className="font-medium">
                {habit.goalValue} {habit.unit}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button onClick={()=>updateHabit(habit.id)} className="text-gray-500">Edit</button>
              <button onClick={() => deleteHabit(habit.id)}>Delete</button>

              <button className="bg-indigo-600 text-white px-4 py-1 rounded-md">
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitItem;
