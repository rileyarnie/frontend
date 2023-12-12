import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="px-4">
      <div className="">
        <ol className="list-inside list-decimal space-y-3">
          <li>
            Standardize naming conventions on the API response e.g. the two APIs
            returned the same data schema but one started with a small letter
            while the other started with a capital letter.{" "}
          </li>
          <li>
            No units of measurement are being returned for the specific
            parameters being measured.
          </li>
          <li>
            For {`"act on spectrum"`} endpoint, since we are sending
            instructions to the spectrum the GET requests {`shouldn't`} be
            allowed since we need to send request with a body, so
            (POST,PUT,PATCH) methods should be the ones allowed
          </li>
          <li>
            The API is currently unprotected, this is a security risk
            considering the nature of the mission. Authentication and
            Authorization shoulld be added to protect the endpoints from
            unauthorized users.
          </li>
          <li>
            Adding a rate limit to the API. This would act a security measure
            and would also maximize cost-efficiency.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default page;
