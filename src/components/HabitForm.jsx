import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();

  const { register, handleSubmit, reset } = useForm({
  defaultValues: {
    priority: "medium",
    unit: "minutes"
  }
});

  const onCommit = (values) => {
    const payload = {
      ...values,
      id: crypto.randomUUID(),
      completed: false,
    };

    addHabit(payload);
    reset();
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 flex flex-col p-6 overflow-hidden">
      <form onSubmit={handleSubmit(onCommit)} className="flex flex-col">
        <label className="text-xs font-semibold text-slate-600">
          Habit Name
        </label>
        <input
          {...register("name",{required:true})}
          placeholder="Morning Exercise"
          className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-placeholder text-sm text-slate-800"
        />

        <div>
          <label className="text-xs font-semibold text-slate-600">
            Daily Goal
          </label>
        </div>
        <div className="flex gap-4">
          <input
            type="number"
            {...register("goalValue", { valueAsNumber: true, required:true })}
            placeholder="30"
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none text-sm"
          />

          <select
            {...register("unit")}
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none text-sm"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">
              Start Date
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none text-sm text-slate-700"
              type="date"
              name="startDate"
                {...register("startDate")}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">
              Category
            </label>
            <select
            {...register("category")}
              name="category"
              className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white focus:border-indigo-500 outline-none text-sm text-slate-700"
            >
              <option value="Health">Health</option>
              <option value="Focus">Focus</option>
              <option value="Growth">Growth</option>
              <option value="Mindset">Mindset</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 mt-2">
            Motivation
          </label>
          <textarea
            name="motivation"
              {...register("motivation")}

            rows="2"
            placeholder="Why is this important to you?"
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none transition-all resize-none text-sm text-slate-700"
          ></textarea>
        </div>

        <div className="flex flex-col gap-1.5 mt-2">
          <label className="text-xs font-semibold text-slate-600">
            Priority Level
          </label>

          <div className="grid grid-cols-3 gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="low" {...register("priority")} /> Low
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="medium" {...register("priority")} />{" "}
              Medium
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="high" {...register("priority")} /> High
            </label>
          </div>
        </div>

        <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors active:bg-indigo-800 mt-2">Create Habit</button>
      </form>
    </div>
  );
};

export default HabitForm;
