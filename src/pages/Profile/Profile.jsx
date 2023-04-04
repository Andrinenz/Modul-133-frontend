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
import { Email } from "@carbon/icons-react";

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

  console.log(profile);

  return (
    <>
      {profileLoaded ? (
        <div className="bx-wrap f-jc">
          <div className="cds--col-lg-13 cds--col-md-7 cds--col-sm-4 pt-3">
            <Tile className="mt-3 pl-0 pt-0 pr-0 pb-3">
              <div className="w100p mt-2">
                <img src={FrameImg} alt="Main" className="frame-img w100p" />
              </div>
              <div className="bx-wrap mt-4">
                <div className="bx-wrap fd-c cds--col-lg-7 cds--col-md-3 cds--col-lg-sm-4 mb-2">
                  <div className="d-flex f-j f-ac">
                    <Email size={"20"} className="mr-1" />
                    <h5>{profile?.email}</h5>
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
