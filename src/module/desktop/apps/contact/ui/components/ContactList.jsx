import { socials } from "@constants";

const ContactList = ({ onSocialClick }) => (
  <ul className="flex flex-wrap items-center gap-3">
    {socials.map((social) => (
      <li key={social.id} style={{ backgroundColor: social.bg }} className="flex-1 min-w-[140px]">
        <a
          href={social.link}
          onClick={(e) => {
            e.preventDefault();
            onSocialClick(social);
          }}
          title={social.text}
          className="space-y-5 flex flex-col justify-between h-full"
        >
          <img src={social.icon} alt={social.text} className="size-5" />
          <p>{social.text}</p>
        </a>
      </li>
    ))}
  </ul>
);

export default ContactList;
