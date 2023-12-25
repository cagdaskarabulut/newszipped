import React from "react";
import { useRouter } from "next/router";

const AdminPanelLogin = () => {
  const router = useRouter();
  const error = router.query.error;
  return (
    <div>
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <p>Enter Password:</p>
          <form action="/api/password-protect" method="post">
            <div className="form-control">
              {error && (
                <label className="label">
                  <span className="label-text text-error">{error}</span>
                </label>
              )}
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  className="input input-bordered"
                />
                <button className="btn">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelLogin;
