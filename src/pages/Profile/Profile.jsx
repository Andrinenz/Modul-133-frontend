/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { useEffect } from "react";
import { Loading, Tile } from "@carbon/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUser } from "../../state/user/userSelector";
import { fetchUserProfile } from "../../state/user/userThrunk";
import FrameImg from "./img/profile.png";
import "./Profile.scss";
import { Email, UpdateNow } from "@carbon/icons-react";
import { Breadcrumb } from "antd";

/*----------------------------------------------------------------------------*/
/* Profile                                                                    */
/*----------------------------------------------------------------------------*/

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, profileLoaded } = useSelector(getUser);

  useEffect(() => {
    dispatch(fetchUserProfile(id));
  }, [dispatch, id]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  console.log(profile);

  return (
    <>
      {profileLoaded ? (
        <div className="bx-wrap f-jc">
          <div className="cds--col-lg-12 pl-0 pr-0 pt-3">
            <Breadcrumb
              items={[
                { title: <a href="/">Home</a> },
                { title: `${profile.firstname} ${profile.lastname}` },
              ]}
            />
            <Tile className="mt-3 pl-0 pt-0 pr-0 pb-3">
              <div className="w100p mt-2">
                <img src={FrameImg} alt="Main" className="frame-img w100p" />
              </div>
              <div className="bx-wrap mt-4">
                <div className="bx-wrap fd-c cds--col-lg-5 mb-2">
                  <div className="d-flex f-ac mb-1">
                    <div>
                      <Email size={"20"} className="mr-1" />
                    </div>
                    <div>
                      <h5>{profile?.email}</h5>
                    </div>
                  </div>
                  <div className="d-flex f-ac mb-1">
                    <div>
                      <UpdateNow size={"20"} className="mr-1" />
                    </div>
                    <div>
                      <h5>
                        {`Erstellt ${
                          months[new Date(profile.createdAt).getMonth()] +
                          " " +
                          new Date(profile.createdAt).getFullYear()
                        }`}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="bx-wrap fd-c cds--col-lg-5">
                  <div className="d-flex f-jb mb-2">
                    <h2>
                      {profile.firstname} {profile.lastname}
                    </h2>
                  </div>
                </div>
              </div>
            </Tile>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Profile;
