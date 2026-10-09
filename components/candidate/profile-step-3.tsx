type JobCategories = Record<string, string[]>;

type Props = {
  highestQualification: string;
  college: string;
  passingYear: string;
  skills: string;

  // First dropdown
  selectedJobField: string;

  // Second dropdown
  preferredJobField: string;

  experience: string;

  expIndustry: string;
  expJobProfile: string;
  expLocation: string;
  expQualification: string;
  expTotalYears: string;
  expPastSalary: string;
  expExpectedSalary: string;

  jobCategories: JobCategories;
  jobCategoryNames: string[];

  errors: Record<string, string>;
  resumeFile: File | null;

  onChange: (
    field:
      | "highestQualification"
      | "college"
      | "passingYear"
      | "skills"
      | "preferredJobField"
      | "experience"
      | "expIndustry"
      | "expJobProfile"
      | "expLocation"
      | "expQualification"
      | "expTotalYears"
      | "expPastSalary"
      | "expExpectedSalary",
    value: string
  ) => void;

  onJobFieldChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
};

const experienceLevels = ["Fresher", "Experienced"];

export default function ProfileStep3({
  highestQualification,
  college,
  passingYear,
  skills,
  selectedJobField,
  preferredJobField,
  experience,
  expIndustry,
  expJobProfile,
  expLocation,
  expQualification,
  expTotalYears,
  expPastSalary,
  expExpectedSalary,
  jobCategories,
  jobCategoryNames,
  resumeFile,
  onChange,
  onJobFieldChange,
  onFileChange,
  errors,
}: Props) {
  const availableJobs =
    selectedJobField && jobCategories[selectedJobField]
      ? jobCategories[selectedJobField]
      : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Professional Details
        </h2>

        <p className="mt-2 text-zinc-500">
          Tell recruiters about your education, skills and career interests.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {/* Highest Qualification */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Highest Qualification (Degree)
          </label>

          <input
            value={highestQualification}
            onChange={(e) =>
              onChange("highestQualification", e.target.value)
            }
            placeholder="Highest Qualification"
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
              errors.highestQualification
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          />

          {errors.highestQualification && (
            <p className="mt-1 text-sm text-red-500">
              {errors.highestQualification}
            </p>
          )}
        </div>

        {/* Passing Year */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Passing Year (Expected if pursuing)
          </label>

          <input
            value={passingYear}
            onChange={(e) =>
              onChange("passingYear", e.target.value)
            }
            placeholder="Passing Year"
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
              errors.passingYear
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          />

          {errors.passingYear && (
            <p className="mt-1 text-sm text-red-500">
              {errors.passingYear}
            </p>
          )}
        </div>

        {/* College */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold">
            College / University
          </label>

          <input
            value={college}
            onChange={(e) =>
              onChange("college", e.target.value)
            }
            placeholder="College / University"
            className={`h-11 w-full rounded-xl border bg-white/50 px-3 transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none dark:bg-zinc-900/50 ${
              errors.college
                ? "border-red-500"
                : "border-zinc-300 hover:border-orange-300 dark:border-zinc-700 dark:hover:border-orange-700"
            }`}
          />
          {errors.college && (
            <p className="mt-1 text-sm text-red-500">
              {errors.college}
            </p>
          )}
        </div>

        {/* Skills */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold">
            Skills
          </label>

          <input
            value={skills}
            onChange={(e) =>
              onChange("skills", e.target.value)
            }
            placeholder="Electrician, Computer, etc.."
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
              errors.skills
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          />

          {errors.skills && (
            <p className="mt-1 text-sm text-red-500">
              {errors.skills}
            </p>
          )}
        </div>

        {/* Job Field - First Dropdown */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Job Field
          </label>

          <select
            value={selectedJobField}
            onChange={(e) =>
              onJobFieldChange(e.target.value)
            }
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
              errors.selectedJobField
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          >
            <option value="">
              Select Job Field
            </option>

            {jobCategoryNames.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>

          {errors.selectedJobField && (
            <p className="mt-1 text-sm text-red-500">
              {errors.selectedJobField}
            </p>
          )}
        </div>

        {/* Preferred Job - Second Dropdown */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Preferred Job
          </label>

          <select
            value={preferredJobField}
            onChange={(e) =>
              onChange("preferredJobField", e.target.value)
            }
            disabled={!selectedJobField}
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 ${
              errors.preferredJobField
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          >
            <option value="">
              {selectedJobField
                ? "Select Preferred Job"
                : "First select Job Field"}
            </option>

            {availableJobs.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>

          {errors.preferredJobField && (
            <p className="mt-1 text-sm text-red-500">
              {errors.preferredJobField}
            </p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Experience
          </label>

          <select
            value={experience}
            onChange={(e) =>
              onChange("experience", e.target.value)
            }
            className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
              errors.experience
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
            }`}
          >
            <option value="">
              Select Experience
            </option>

            {experienceLevels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {errors.experience && (
            <p className="mt-1 text-sm text-red-500">
              {errors.experience}
            </p>
          )}
        </div>

        {/* Resume Upload */}
        <div className="md:col-span-2 mt-4">
          <label className="mb-2 block text-sm font-semibold">
            Upload Resume (PDF, DOCX)
          </label>
          <div className={`relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition-all duration-200 ${resumeFile ? 'border-orange-500 bg-orange-500/10' : 'border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:border-orange-300 dark:hover:border-orange-700'}`}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => onFileChange(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center pointer-events-none">
              {resumeFile ? (
                <>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="mt-2 text-sm font-medium text-orange-600 dark:text-orange-400">{resumeFile.name}</p>
                  <p className="text-xs text-orange-500/70">Click to change file</p>
                </>
              ) : (
                <>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  </div>
                  <p className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Drag & drop your resume here</p>
                  <p className="text-xs text-zinc-500">or click to browse</p>
                </>
              )}
            </div>
          </div>
          {errors.resumeFile && (
            <p className="mt-1 text-sm text-red-500">
              {errors.resumeFile}
            </p>
          )}
        </div>

      </div>

      {/* Conditional Fields for Experienced Candidates */}
      {experience === "Experienced" && (
        <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <h3 className="mb-4 text-lg font-bold">Experience Details</h3>
          <div className="grid gap-5 md:grid-cols-2">
            
            {/* Company */}
            <div>
              <label className="mb-2 block text-sm font-semibold">Company</label>
              <input
                value={expIndustry}
                onChange={(e) => onChange("expIndustry", e.target.value)}
                placeholder="E.g. TCS, Infosys, Reliance"
                className={`h-11 w-full rounded-xl border bg-white/50 px-3 transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none dark:bg-zinc-900/50 ${
                  errors.expIndustry
                    ? "border-red-500"
                    : "border-zinc-300 hover:border-orange-300 dark:border-zinc-700 dark:hover:border-orange-700"
                }`}
              />
              {errors.expIndustry && <p className="mt-1 text-sm text-red-500">{errors.expIndustry}</p>}
            </div>

            {/* Job Profile */}
            <div>
              <label className="mb-2 block text-sm font-semibold">Job Profile</label>
              <input
                value={expJobProfile}
                onChange={(e) => onChange("expJobProfile", e.target.value)}
                placeholder="E.g. Software Engineer"
                className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
                  errors.expJobProfile
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
                }`}
              />
              {errors.expJobProfile && <p className="mt-1 text-sm text-red-500">{errors.expJobProfile}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-semibold">Location</label>
              <input
                value={expLocation}
                onChange={(e) => onChange("expLocation", e.target.value)}
                placeholder="E.g. Mumbai, Pune"
                className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
                  errors.expLocation
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
                }`}
              />
              {errors.expLocation && <p className="mt-1 text-sm text-red-500">{errors.expLocation}</p>}
            </div>

            {/* Qualification */}
            <div>
              <label className="mb-2 block text-sm font-semibold">Qualification</label>
              <input
                value={expQualification}
                onChange={(e) => onChange("expQualification", e.target.value)}
                placeholder="E.g. B.Tech, MBA"
                className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
                  errors.expQualification
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
                }`}
              />
              {errors.expQualification && <p className="mt-1 text-sm text-red-500">{errors.expQualification}</p>}
            </div>

            {/* Total Experience */}
            <div>
              <label className="mb-2 block text-sm font-semibold">Experience (Total Years)</label>
              <input
                value={expTotalYears}
                onChange={(e) => onChange("expTotalYears", e.target.value)}
                placeholder="E.g. 5 Years"
                className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
                  errors.expTotalYears
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
                }`}
              />
              {errors.expTotalYears && <p className="mt-1 text-sm text-red-500">{errors.expTotalYears}</p>}
            </div>

            {/* Past Salary */}
            <div>
              <label className="mb-2 block text-sm font-semibold">Past Salary (Per Month)</label>
              <input
                value={expPastSalary}
                onChange={(e) => onChange("expPastSalary", e.target.value)}
                placeholder="E.g. 50,000"
                className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
                  errors.expPastSalary
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
                }`}
              />
              {errors.expPastSalary && <p className="mt-1 text-sm text-red-500">{errors.expPastSalary}</p>}
            </div>

            {/* Expected Salary */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">Expected Salary (Per Month)</label>
              <input
                value={expExpectedSalary}
                onChange={(e) => onChange("expExpectedSalary", e.target.value)}
                placeholder="E.g. 60,000"
                className={`h-11 w-full rounded-xl border bg-white px-3 transition-all duration-200 focus:outline-none dark:bg-zinc-900 ${
                  errors.expExpectedSalary
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-zinc-300 focus:border-black focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700"
                }`}
              />
              {errors.expExpectedSalary && <p className="mt-1 text-sm text-red-500">{errors.expExpectedSalary}</p>}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}