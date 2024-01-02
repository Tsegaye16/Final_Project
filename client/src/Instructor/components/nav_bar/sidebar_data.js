import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { MdOutlineQuiz } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { TbUsersGroup } from "react-icons/tb";

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/instructor',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Quiz',
    path: '/quiz',
    icon: <MdOutlineQuiz />,
    cName: 'nav-text'
  },
  {
    title: 'Content',
    path: '/content',
    icon: <BiBookContent />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/users',
    icon: <TbUsersGroup />,
    cName: 'nav-text'
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: 'nav-text'
  // }
];