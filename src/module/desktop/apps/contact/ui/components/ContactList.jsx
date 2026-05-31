import { socials } from "@constants";

const ContactList = () => (
  <ul className="flex flex-wrap items-center gap-3">
    {socials.map(({ id, bg, link, icon, text }) => (
      <li key={id} style={{ backgroundColor: bg }} className="flex-1 min-w-[140px]">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={text}
          className="space-y-5 flex flex-col justify-between h-full"
        >
          <img src={icon} alt={text} className="size-5" />
          <p>{text}</p>
        </a>
      </li>
    ))}
  </ul>
);

export default ContactList;
