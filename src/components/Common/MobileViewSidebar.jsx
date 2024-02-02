import React, { useState } from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { sidebarLinks } from "../../data/dashboard-links";
import SidebarLink from "../core/Dashboard/SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { logout } from "../../services/operations/authAPI";
import ConfirmationModal from "../Common/ConfirmationModal";

const MobileViewSidebar = () => {
  const [isOpen, setIsOpnen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpnen(!isOpen);
  };
  return (
    <div className="flex absolute top-0 left-0 text-center border-r-[1px] border-richblack-700">
      <motion.div
        animate={{ width: !isOpen ? "200px" : "0px" }}
        className="sidebar bg-richblack-800 text-richblack-300 h-[100vh]"
      >
        <div className="flex flexr-row items-center justify-between border-b-[1px] border-richblack-700 mb-2 p-[0.85rem] transition-all duration-500">
          {!isOpen && <h1 className="font-semibold text-lg">StudyNotion</h1>}
          <RxCross2 size={22} onClick={toggle} />
        </div>

        <div className="flex flex-col">
          <SidebarLink link={{ name: "Home", path: "/" }} iconName="VscHome" />
          <SidebarLink
            link={{ name: "Courses", path: "/catalog/python" }}
            iconName="VscRepo"
          />
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}

          {token !== null && (
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
          )}

          <SidebarLink
            link={{ name: "Contact Us", path: "/contact" }}
            iconName="VscMail"
          />
          <SidebarLink
            link={{ name: "About", path: "/about" }}
            iconName="VscAzure"
          />

          {token !== null && (
            <button
              onClick={() => dispatch(logout(navigate))}
              className="px-8 py-2 text-sm font-medium text-richblack-300"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MobileViewSidebar;
