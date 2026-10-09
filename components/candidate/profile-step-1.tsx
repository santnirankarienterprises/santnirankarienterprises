type ProfileStep1Props = {
  fullName: string;
  phone: string;
  dob: string;
  gender: string;

  errors?: Record<string, string>;

  onChange: (
    field: "fullName" | "phone" | "dob" | "gender",
    value: string
  ) => void;
};

export default function ProfileStep1({
  fullName,
  phone,
  dob,
  gender,
  onChange,
  errors,
}: ProfileStep1Props) {
  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Basic Information
        </h2>

        <p className="mt-2 text-zinc-500">
          Tell us about yourself so recruiters can identify you easily.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Full Name
          </label>

          <input
            value={fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Enter your name"
            className={`h-11 w-full rounded-xl border bg-white/50 px-3 transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none dark:bg-zinc-900/50 ${
              errors?.fullName
                ? "border-red-500"
                : "border-zinc-300 hover:border-orange-300 dark:border-zinc-700 dark:hover:border-orange-700"
            }`}
          />

          {errors?.fullName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Phone Number
          </label>

          <input
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="9623456789"
            className={`h-11 w-full rounded-xl border bg-white/50 px-3 transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none dark:bg-zinc-900/50 ${
              errors?.phone
                ? "border-red-500"
                : "border-zinc-300 hover:border-orange-300 dark:border-zinc-700 dark:hover:border-orange-700"
            }`}
          />

          {errors?.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Date of Birth
          </label>

          <input
            type="date"
            value={dob}
            onChange={(e) => onChange("dob", e.target.value)}
            className={`h-11 w-full rounded-xl border bg-white/50 px-3 transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none dark:bg-zinc-900/50 ${
              errors?.dob
                ? "border-red-500"
                : "border-zinc-300 hover:border-orange-300 dark:border-zinc-700 dark:hover:border-orange-700"
            }`}
          />

          {errors?.dob && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dob}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Gender
          </label>

          <select
            value={gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className={`h-11 w-full rounded-xl border bg-white/50 px-3 transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none dark:bg-zinc-900/50 ${
              errors?.gender
                ? "border-red-500"
                : "border-zinc-300 hover:border-orange-300 dark:border-zinc-700 dark:hover:border-orange-700"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          {errors?.gender && (
            <p className="mt-1 text-sm text-red-600">
              {errors.gender}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}