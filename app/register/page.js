import Logo from "../ui/Logo";

export default function Page() {
  return (
    <>
      <div className="flex items-center min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:w-[34rem] sm:py-8 mx-auto sm:border sm:border-gray-200 sm:shadow-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
            <Logo />
            <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
              Create new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password Confirm
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="text-[13px] font-medium flex items-center gap-1">
                <input type="checkbox" />
                <span>
                  I accept
                  <a
                    className="text-color-primary hover:text-color-primary/70"
                    href="#"
                  >
                    {" "}
                    Terms and conditions
                  </a>
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="font-serif flex w-full justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?
              <a
                href="/login"
                className="font-semibold leading-6 text-color-primary hover:text-color-primary/70"
              >
                &nbsp; Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
