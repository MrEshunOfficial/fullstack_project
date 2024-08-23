import { useState } from "react";
import "./Profile.css";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMale } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoIosText } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Profile() {
  const [basicInfor, setBasicInfor] = useState(true);
  const [professionalInfo, setProfessionalInfo] = useState(false);
  const [contactCard, setContactCard] = useState(false);
  const [shareProfile, setShareProfile] = useState(false);

  const [editProfile, setEditProfile] = useState(false);

  const toggleBasicInfo = () => {
    setBasicInfor(true);
    setProfessionalInfo(false);
    setContactCard(false);
    setShareProfile(false);
  };
  const toggleProfesionalInfo = () => {
    setBasicInfor(false);
    setProfessionalInfo(true);
    setContactCard(false);
    setShareProfile(false);
  };
  const toggleContactCard = () => {
    setBasicInfor(false);
    setProfessionalInfo(false);
    setContactCard(true);
    setShareProfile(false);
  };
  const toggleShareProfile = () => {
    setBasicInfor(false);
    setProfessionalInfo(false);
    setContactCard(false);
    setShareProfile(true);
  };

  return (
    <section className="profile--page">
      <div className=" first-container">
        <div className="box--one bg-teal-950">
          <div className="flex gap-4 px-2 items-center justify-center w-max h-12 bg-white">
            <strong className=" text-black">Social Media Profile Links:</strong>
            <div className=" flex text-white gap-2">
              <span className="icon">
                <FaLinkedin className=" text-blue-900" />
              </span>
              <span className="icon">
                <FaSquareGithub className=" text-black" />
              </span>
              <span className="icon">
                <FaSquareFacebook className=" text-blue-900" />
              </span>
              <span className="icon">
                <IoLogoYoutube className=" text-red-800" />
              </span>
              <span className="icon">
                <FaSquareXTwitter className=" text-blue-800" />
              </span>
            </div>
          </div>
        </div>
        <div className="box--two">
          <div className="user-info">
            <div className="user--img">
              <img
                src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                alt="Avatar"
              />
            </div>
            <div className="edit--box">
              <div className=" items-start flex flex-col gap-2">
                <strong className=" text-3xl">Christopher Eshun</strong>
                <p className="text-lg">Accra, Ghana</p>
              </div>
              <div className=" w-1/4 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setEditProfile((prev) => !prev);
                  }}>
                  {!editProfile ? "Edit" : "Submit"}
                </button>
              </div>
            </div>
          </div>
          {editProfile && (
            <>
              <header className="header-pages">
                <button type="button" onClick={toggleBasicInfo}>
                  Edit Basic Info
                </button>
                <button type="button" onClick={toggleProfesionalInfo}>
                  Edit Profesional Info
                </button>
                <button type="button" onClick={toggleContactCard}>
                  Add Social Media Links
                </button>
              </header>
              <div className="profile-details p-2">
                {basicInfor && <EditBasicInfo />}
                {professionalInfo && <EditProfesionalInfo />}
                {contactCard && <MediaLinks />}
              </div>
            </>
          )}
          {!editProfile && (
            <>
              <header className="header-pages">
                <button type="button" onClick={toggleBasicInfo}>
                  Basic Info
                </button>
                <button type="button" onClick={toggleProfesionalInfo}>
                  Profesional Info
                </button>
                <button type="button" onClick={toggleContactCard}>
                  Contact Card
                </button>
                <button type="button" onClick={toggleShareProfile}>
                  Storage
                </button>
              </header>
              <div className="profile-details p-2">
                {basicInfor && <BasicInfo />}
                {professionalInfo && <ProfesionalInfo />}
                {contactCard && <ContactCard />}
                {shareProfile && <Storage />}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function EditBasicInfo() {
  return (
    <div className=" w-full h-full flex">
      <div className="basic-class w-1/4 flex items-center justify-center"></div>
      <div className=" flex-1 flex items-center justify-center">
        <ul className="prof--card edit-prof-card w-full h-full flex flex-col items-start justify-center p-2 gap-2 shadow-xl">
          <li className="w-full border-b border-teal-950">
            <strong className=" text-xl">Basic Information</strong>
          </li>
          <li>
            <FaUserAlt />
            <input
              type="text"
              placeholder="Enter Full Name"
              className=" focus:outline-none placeholder:gray placeholder:text-sm"
            />
          </li>
          <li>
            <label htmlFor="male">Male</label>
            <input type="radio" name="Gender" id="male" defaultChecked />
            <label htmlFor="female">Female</label>
            <input type="radio" name="Gender" id="female" />
          </li>
          <li>
            <MdEmail />
            <input
              type="email"
              placeholder="Enter Email"
              className=" focus:outline-none placeholder:gray placeholder:text-sm"
            />
          </li>
          <li>
            <BsFillTelephoneFill />
            <input
              type="tel"
              placeholder="Enter your Contact "
              className=" focus:outline-none placeholder:gray placeholder:text-sm"
            />
          </li>
          <li>
            <FaLocationDot />
            <input
              type="text"
              placeholder="Location"
              className=" focus:outline-none placeholder:gray placeholder:text-sm"
            />
          </li>
        </ul>
      </div>
      <div className=" flex-1">
        <ul className="w-full flex flex-col items-start justify-center p-2 gap-4">
          <li className="w-full flex items-center justify-start gap-2 h-9 pb-2 border-b border-orange-500">
            <strong className="text-2xl">Personal Bio</strong>
          </li>
          <li className="w-full flex items-center justify-start gap-2 h-max">
            <textarea
              name="userBio"
              id="userBio"
              cols="30"
              rows="10"
              className="w-full h-full bg-inherit border p-2 border-teal-950 focus:outline-none rounded-lg"></textarea>
          </li>
        </ul>
      </div>
    </div>
  );
}

function EditProfesionalInfo() {
  return (
    <div className=" w-full h-full flex">
      <div className="prof--class w-1/4 flex items-center justify-center"></div>
      <div className=" flex-1 flex items-center justify-center ">
        <ul className="prof--card edit-prof-card w-full h-full flex flex-col items-start justify-center px-1 gap-2 rounded-md shadow-xl">
          <li className="w-full border-b border-teal-950">
            <strong className=" text-xl mb-2">Professional Information</strong>
          </li>
          <li>
            <MdOutlineWork />
            <input
              type="text"
              placeholder=" Enter Service Rendering"
              className=" focus:outline-none placeholder:gray placeholder:text-sm"
            />
          </li>
          <li>
            <FaLink />
            <input
              type="url"
              placeholder="Web address"
              className=" focus:outline-none placeholder:gray placeholder:text-sm"
            />
          </li>
          <li>
            <MdEmail />
            <input
              type="email"
              placeholder=" contact email"
              className=" focus:outline-none placeholder:gray placeholder:text-sm"
            />
          </li>
          <li>
            <BsFillTelephoneFill />
            <input
              type="tel"
              placeholder=" company or organization contact"
              className=" focus:outline-none placeholder:gray placeholder:text-sm"
            />
          </li>
          <li className=" flex items-center justify-start gap-2 h-12 w-full">
            <FaLocationDot />
            <input
              type="text"
              placeholder="company or organization location"
              className=" focus:outline-none placeholder:gray placeholder:text-sm"
            />
          </li>
        </ul>
      </div>
      <div className=" flex-1">
        <ul className="w-full flex flex-col items-start justify-center p-2 gap-4">
          <li className="w-full flex items-center justify-start gap-2 h-9 pb-2 border-b border-orange-500">
            <strong className="text-2xl">Professional Bio</strong>
          </li>
          <li className="w-full flex items-center justify-start gap-2 h-max">
            <textarea
              name="userBio"
              id="userBio"
              cols="30"
              rows="10"
              className="w-full h-full bg-inherit border p-2 border-teal-950 focus:outline-none rounded-lg"></textarea>
          </li>
        </ul>
      </div>
    </div>
  );
}

function BasicInfo() {
  return (
    <div className=" w-full h-full flex">
      <div className="basic-class w-1/4 flex items-center justify-center"></div>
      <div className=" flex-1 flex items-center justify-center">
        <ul className="prof--card , w-full h-full flex flex-col items-start justify-center p-2 gap-2 shadow-xl">
          <li className="w-full border-b border-teal-950">
            <strong className=" text-xl">Basic Information</strong>
          </li>
          <li>
            <FaUserAlt />
            Full Name:
          </li>
          <li>
            <FaMale />
            Gender:
          </li>
          <li>
            <MdEmail />
            Email:
          </li>
          <li>
            <BsFillTelephoneFill />
            Tel:
          </li>
          <li>
            <FaLocationDot />
            Location:
          </li>
        </ul>
      </div>
      <div className=" flex-1">
        <ul className="w-full flex flex-col items-start justify-center p-2 gap-4">
          <li className="w-full flex items-center justify-start gap-2 h-9 pb-2 border-b border-orange-500">
            <strong className="text-2xl">Personal Bio</strong>
          </li>
          <li className="w-full flex items-center justify-start gap-2 h-max">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo et
            iure dolores nesciunt harum ducimus repellendus fuga temporibus
            adipisci tempora! Illo ea libero similique quasi facere dolores
            iure! Tenetur, qui dolore deleniti aspernatur nam, impedit similique
            quidem non ipsam ut dolorum, voluptatibus cum. Deleniti, molestiae
            explicabo. Nemo, libero? Cum rerum numquam quos debitis quaerat,
            facilis tenetur distinctio aspernatur. Alias animi quos ipsum
            provident earum ullam delectus molestiae asperiores explicabo, illo
            doloribus, tempora amet ut similique? Amet facere corrupti, sapiente
            minima praesentium impedit necessitatibus aliquam in est, architecto
            nulla temporibus voluptatum iste beatae numquam fugiat eveniet culpa
            rem quidem. Ad, consequatur.
          </li>
        </ul>
      </div>
    </div>
  );
}
function ProfesionalInfo() {
  return (
    <div className=" w-full h-full flex">
      <div className="prof--class w-1/4 flex items-center justify-center"></div>
      <div className=" flex-1 border-l border-r flex items-center justify-center ">
        <ul className="prof--card w-full h-full flex flex-col items-start justify-center px-1 gap-2 rounded-md shadow-xl">
          <li className="w-full border-b border-teal-950">
            <strong className=" text-xl mb-2">Professional Information</strong>
          </li>
          <li>
            <MdOutlineWork />
            <strong>Service Rendered: </strong>
          </li>
          <li>
            <FaLink />
            <strong> Website: </strong>
          </li>
          <li>
            <MdEmail />
            <strong>Business Email: </strong>
          </li>
          <li>
            <BsFillTelephoneFill />
            <strong>Hot Line: </strong>
          </li>
          <li className=" flex items-center justify-start gap-2 h-12 w-full">
            <FaLocationDot />
            <strong> Location: </strong>
          </li>
        </ul>
      </div>
      <div className=" flex-1">
        <ul className="w-full flex flex-col items-start justify-center p-2 gap-4">
          <li className="w-full flex items-center justify-start gap-2 h-9 pb-2 border-b border-orange-500">
            <strong className="text-2xl">Professional Bio</strong>
          </li>
          <li className="w-full flex items-center justify-start gap-2 h-max">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo et
            iure dolores nesciunt harum ducimus repellendus fuga temporibus
            adipisci tempora! Illo ea libero similique quasi facere dolores
            iure! Tenetur, qui dolore deleniti aspernatur nam, impedit similique
            quidem non ipsam ut dolorum, voluptatibus cum. Deleniti, molestiae
            explicabo. Nemo, libero? Cum rerum numquam quos debitis quaerat,
            facilis tenetur distinctio aspernatur. Alias animi quos ipsum
            provident earum ullam delectus molestiae asperiores explicabo, illo
            doloribus, tempora amet ut similique? Amet facere corrupti, sapiente
            minima praesentium impedit necessitatibus aliquam in est, architecto
            nulla temporibus voluptatum iste beatae numquam fugiat eveniet culpa
            rem quidem. Ad, consequatur.
          </li>
        </ul>
      </div>
    </div>
  );
}
function MediaLinks() {
  return (
    <div className=" w-full h-full flex">
      <div className="contact--class w-1/4 flex items-center justify-center">
        <strong className=" text-3xl">Social Media </strong>
      </div>
      <div className=" flex-1 flex items-center justify-center ">
        <ul className="prof--card  w-full h-full flex flex-col items-start justify-center px-1 gap-2 rounded-md shadow-xl">
          <li className="w-full border-b border-teal-950">
            <strong className=" text-xl mb-2">Social Media Links</strong>
          </li>
          <li>
            <FaLinkedin className=" text-blue-900" />
            <input
              type="url"
              placeholder=" link to linkedin profile"
              className=" focus:outline-none placeholder:gray placeholder:text-sm p-2 bg-inherit w-full"
            />
          </li>
          <li>
            <FaSquareGithub className=" text-black" />
            <input
              type="url"
              placeholder="link to github"
              className=" focus:outline-none placeholder:gray placeholder:text-sm p-2 bg-inherit w-full"
            />
          </li>
          <li>
            <FaSquareFacebook className=" text-blue-900" />
            <input
              type="url"
              placeholder=" link to facebook profile"
              className=" focus:outline-none placeholder:gray placeholder:text-sm p-2 bg-inherit w-full"
            />
          </li>
          <li>
            <IoLogoYoutube className=" text-red-800" />
            <input
              type="url"
              placeholder=" link to youtube channel"
              className=" focus:outline-none placeholder:gray placeholder:text-sm p-2 bg-inherit w-full"
            />
          </li>
          <li className=" flex items-center justify-start gap-2 h-12 w-full">
            <FaSquareXTwitter className=" text-blue-800" />
            <input
              type="url"
              placeholder="Link to Twitter"
              className=" focus:outline-none placeholder:gray placeholder:text-sm p-2 bg-inherit w-full"
            />
          </li>
        </ul>
      </div>
      <div className=" flex-1 flex flex-col items-center justify-center gap-3">
        <button
          type="submit"
          className=" w-2/5 h-12 rounded-full shadow-3xl bg-teal-950 text-white active:translate-y-0.5 duration-300 hover:opacity-75">
          Submit
        </button>
        <button
          type="reset"
          className=" w-2/5 h-12 rounded-full shadow-3xl bg-orange-500 text-white active:translate-y-0.5 duration-300 hover:opacity-75">
          Cancel
        </button>
      </div>
    </div>
  );
}
function ContactCard() {
  const [shareLinks, setShareLinks] = useState(false);

  return (
    <div className=" w-full h-full flex">
      <div className="contact--class w-1/4 flex items-center justify-center">
        <strong className=" text-3xl">Contact Card</strong>
      </div>
      <div className=" flex-1 flex items-center justify-center">
        <ul className="card">
          <li>
            <img
              src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
              alt="Avatar"
            />
          </li>
          <li>
            <ol>
              <li>
                <FaUserAlt />
                <strong>name :</strong> Christopher Eshun
              </li>
              <li>
                <MdEmail />
                <strong>email :</strong> christophereshun91@gmail.com
              </li>
              <li>
                <BsFillTelephoneFill />
                <strong>Tel: </strong> +233547740577
              </li>
              <li>
                <MdOutlineWork />
                <strong>Service: </strong> Web Development
              </li>
              <li>
                <FaLocationDot />
                <strong>Location: </strong> Accra-Ghana
              </li>
              <li>
                <FaLink />
                <strong>Website: </strong>
                https://github.com
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <div className=" flex-1 flex flex-col items-center justify-center gap-2">
        <strong>Share Contact Card</strong>
        <button
          type="button"
          className=" w-1/4 h-11 border border-gray-200 rounded-md shadow-2xl bg-inherit duration-300 hover:bg-teal-950 hover:text-white active:translate-y-0.5"
          onClick={() => {
            setShareLinks((prev) => !prev);
          }}>
          Share
        </button>

        {shareLinks && (
          <div className="w-max p-2 rounded-lg flex items-center justify-center gap-4 mt-3 shadow-2xl border">
            <button type="button" className=" w-max bg-inherit ">
              Share Via:
            </button>
            <div className="w-max flex items-center justify-start gap-4">
              <div className=" flex items-center justify-start gap-1 hover:bg-teal-950 hover:text-white duration-300 p-1 rounded cursor-pointer active:translate-y-0.5">
                <MdEmail />
                Email
              </div>
              <div className=" flex items-center justify-start gap-1 hover:bg-teal-950 hover:text-white duration-300 p-1 rounded cursor-pointer active:translate-y-0.5">
                <IoLogoWhatsapp />
                Whatsapp
              </div>
              <div className=" flex items-center justify-start gap-1 hover:bg-teal-950 hover:text-white duration-300 p-1 rounded cursor-pointer active:translate-y-0.5">
                <IoIosText />
                Text
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function Storage() {
  const [photos, setPhotos] = useState(true);
  const [videos, setVideos] = useState(false);
  const [audio, setAudio] = useState(false);
  const [documents, setDocuments] = useState(false);

  const togglePhotos = () => {
    setPhotos(true);
    setVideos(false);
    setAudio(false);
    setDocuments(false);
  };
  const toggleVideos = () => {
    setPhotos(false);
    setVideos(true);
    setAudio(false);
    setDocuments(false);
  };
  const toggleAudio = () => {
    setPhotos(false);
    setVideos(false);
    setAudio(true);
    setDocuments(false);
  };
  const toggleDocuments = () => {
    setPhotos(false);
    setVideos(false);
    setAudio(false);
    setDocuments(true);
  };
  return (
    <div className="w-full h-full flex items-center justify-between">
      <div className="w-1/4 h-full flex items-center justify-center">
        <ul className="prof--card extend w-full h-full flex flex-col items-center justify-center">
          <li className="w-full border-b border-teal-950">
            <strong className=" text-xl mb-2">Storage Files</strong>
          </li>
          <li
            className=" hover:bg-slate-800 hover:text-white active:translate-y-0.5 duration-200 p-2 rounded-md text-sm"
            onClick={togglePhotos}>
            Photos
          </li>
          <li
            className=" hover:bg-slate-800 hover:text-white active:translate-y-0.5 duration-200 p-2 rounded-md text-sm"
            onClick={toggleVideos}>
            Videos
          </li>
          <li
            className=" hover:bg-slate-800 hover:text-white active:translate-y-0.5 duration-200 p-2 rounded-md text-sm"
            onClick={toggleAudio}>
            Audio
          </li>
          <li
            className=" hover:bg-slate-800 hover:text-white active:translate-y-0.5 duration-200 p-2 rounded-md text-sm"
            onClick={toggleDocuments}>
            Documents
          </li>
        </ul>
      </div>
      <div className="media-content w-3/4">
        {photos && <Photos />}
        {videos && <Videos />}
        {audio && <Audio />}
        {documents && <Documents />}
      </div>
    </div>
  );
}

function Photos() {
  return <div>Photos</div>;
}
function Videos() {
  return <div>Videos</div>;
}
function Audio() {
  return <div>Audio</div>;
}
function Documents() {
  return <div>Documents</div>;
}
