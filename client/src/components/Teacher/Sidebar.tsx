import React, { useState } from "react";
import { FaBars, FaHome, FaTh, FaCog, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// interface SidebarProps {
//   onNavItemClick: (page: string) => void;
// }

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  // const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isSelfServicesOpen, setSelfServicesOpen] = useState(false);
  const [isDocumentOpen, setDocumentOpen] = useState(false);
  const [isAdmissionDocumentOpen, setAdmissionDocumentOpen] = useState(false);

  // const homeItems = [
  //   {
  //     path: "/student-home",
  //     name: "Home",
  //     icon: <FaHome />,
  //   },
  // ];
  const selfServicesItems = [
    {
      path: "student-profile",
      name: "Profile",
      icon: <FaHome />,
    },
    {
      path: "student-marks",
      name: "Marks",
      icon: <FaTh />,
    },
    {
      path: "student-admit",
      name: "Admit",
      icon: <FaTh />,
    },
    {
      path: "student-syllabus",
      name: "Syllabus",
      icon: <FaCog />,
    },
    {
      path: "student-forgot-password",
      name: "Change Password",
      icon: <FaCog />,
    },
  ];

  const documentItems = [
    {
      path: "https://drive.google.com/file/d/12i0ec8V0orAkjZMJiDV2Kf-sI8qOe4wJ/view?usp=drivesdk",
      name: "No Dues",
      icon: <FaFileAlt />,
    },
    {
      path: "https://drive.google.com/file/d/12i0ec8V0orAkjZMJiDV2Kf-sI8qOe4wJ/view?usp=drivesdk",
      name: "Library No Dues",
      icon: <FaFileAlt />,
    },
    {
      path: "https://drive.google.com/file/d/12i0ec8V0orAkjZMJiDV2Kf-sI8qOe4wJ/view?usp=drivesdk",
      name: "Exam Form",
      icon: <FaFileAlt />,
    },
  ];

  const admissionDocumentItems = [
    {
      path: "/university-ruleBook",
      name: "University RuleBook",
      icon: <FaFileAlt />,
    },
    {
      path: "/anti- Ragging",
      name: "Anti Ragging Rule Book",
      icon: <FaFileAlt />,
    },
    {
      path: "student-feesStructure",
      name: "Download Fees Structure",
      icon: <FaFileAlt />,
    },
    {
      path: "student-hostel-feesStructure",
      name: "Download Hostel Fees Structure",
      icon: <FaFileAlt />,
    },
    {
      path: "registration-certificate",
      name: "Download Registration Certificate",
      icon: <FaFileAlt />,
    },
    {
      path: "admission-letter",
      name: "Admission Letter",
      icon: <FaFileAlt />,
    },
    {
      path: "idCard",
      name: "ID Card",
      icon: <FaFileAlt />,
    },
  ];

  return (
    <div
      className={`flex flex-col bg-gray-800 text-white h-full p-4 ${
        isOpen ? "w-64" : "w-20"
      } transition-width duration-300`}
    >
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${isOpen ? "block" : "hidden"}`}>
          LOGO
        </h1>
        <FaBars
          className="cursor-pointer text-xl"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <div className="mt-8 ml-4">
        <SidebarItem
          icon={<FaHome />}
          text="Home"
          isOpen={isOpen}
          linkTo="student-dashboard"
          // onClick={() => setIsHomeOpen(!isHomeOpen)}
        >
          {/* {
            isHomeOpen && (
              <div className="ml-4">
                {homeItems.map((item) => (
                  <SidebarSubItem
                    key={item.name}
                    text={item.name}
                    linkTo={item.path}
                  />
                ))}
              </div>
            )
          } */}
        </SidebarItem>

        <SidebarItem
          icon={<FaTh />}
          text="Self Services"
          isOpen={isOpen}
          onClick={() => setSelfServicesOpen(!isSelfServicesOpen)}
        >
          {isSelfServicesOpen && (
            <div className="ml-4">
              {selfServicesItems.map((item) => (
                <SidebarSubItem
                  key={item.name}
                  text={item.name}
                  linkTo={item.path}
                />
              ))}
            </div>
          )}
        </SidebarItem>

        <SidebarItem
          icon={<FaFileAlt />}
          text="Document"
          isOpen={isOpen}
          onClick={() => setDocumentOpen(!isDocumentOpen)}
        >
          {isDocumentOpen && (
            <div className="ml-4">
              {documentItems.map((item) => (
                <SidebarSubItem
                  key={item.name}
                  text={item.name}
                  linkTo={item.path}
                  // icon={item.icon}
                />
              ))}
            </div>
          )}
        </SidebarItem>

        <SidebarItem
          icon={<FaFileAlt />}
          text="Admission Document"
          isOpen={isOpen}
          onClick={() => setAdmissionDocumentOpen(!isAdmissionDocumentOpen)}
        >
          {isAdmissionDocumentOpen && (
            <div className="ml-4">
              {admissionDocumentItems.map((item) => (
                <SidebarSubItem
                  key={item.name}
                  text={item.name}
                  linkTo={item.path}
                  // icon={item.icon}
                />
              ))}
            </div>
          )}
        </SidebarItem>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon?: React.ReactNode;
  text: string;
  isOpen: boolean;
  linkTo?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  isOpen,
  linkTo,
  onClick,
  children,
}) => (
  <div>
    <div
      className={`flex items-center p-2 cursor-pointer hover:bg-gray-700`}
      onClick={onClick}
    >
      {icon}
      <span className={`ml-2 ${isOpen ? "block" : "hidden"}`}>
        {linkTo ? <Link to={linkTo}>{text}</Link> : text}
      </span>
    </div>
    {isOpen && children}
  </div>
);

interface SidebarSubItemProps {
  text: string;
  linkTo?: string;
  isOpen?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const SidebarSubItem: React.FC<SidebarSubItemProps> = ({
  text,
  linkTo,
  onClick,
  children,
}) => {
  if (!linkTo) {
    return null;
  }
  return (
    <div className="cursor-pointer hover:bg-gray-700" onClick={onClick}>
      <Link to={linkTo} className="block py-2 pl-4">
        {text}
      </Link>
      {children}
    </div>
  );
};

export default Sidebar;