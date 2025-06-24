import styled from "styled-components";
import { useGetUser } from "./useGetUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar() {
  const { data: user } = useGetUser();
  const { full_name, avatar } = user.user_metadata || {};
  return (
    <StyledUserAvatar>
      <Avatar
        src={
          avatar ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
        }
        alt="User Avatar"
      />
      <span>{full_name}</span>
    </StyledUserAvatar>
  );
}
