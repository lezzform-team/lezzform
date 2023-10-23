import { Input } from "../ui/input";

export const SingleLineText = () => {
  return (
    <div className="bg-red-500">
      <p className="text-sm font-medium leading-none">Email address</p>
      <Input />
    </div>
  );
};
