import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ScaleLoader } from "react-spinners";

function UserList({ fetchNext, users, onClick }) {
  const loadingRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNext();
      }
    });

    observer.observe(loadingRef.current);

    return () => observer.disconnect();
  }, [fetchNext]);

  return (
    <>
      <Grid>
        {users.map((user) => (
          <Container key={user.id} onClick={() => onClick(user)}>
            <ImgContainer>
              <Img src={user.imageUrl} alt="" />
            </ImgContainer>

            <UserInfoContainer>
              <UserName>
                <Strong>
                  {user.prefix} {user.name} {user.lastName}
                </Strong>
              </UserName>
              <UserTitle>{user.title}</UserTitle>
            </UserInfoContainer>
          </Container>
        ))}
      </Grid>
      <SpinnerContainer ref={loadingRef}>
        <ScaleLoader color="#36d7b7" height={50} width={10} />
      </SpinnerContainer>
    </>
  );
}

export default UserList;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 10px;
  gap: 20px;

  @media only screen and (min-width: 991px) {
    grid-template-columns: auto auto auto auto;
  }
`;

const Container = styled.div`
  border: 1px solid #ccc;
  cursor: pointer;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 100%;
`;
const ImgContainer = styled.div``;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 2px 10px;
`;

const Strong = styled.strong``;

const UserName = styled.p``;

const UserTitle = styled.p``;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
