import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import UsersFriends from "../components/UsersFriends";
import styled from "styled-components";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const getUserFullInfo = (id) => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getUserFullInfo(id);
  }, [id]);

  const breadcrumbs = location.state || [];

  const handleFriendClick = (next) => {
    navigate(`/user/${next.id}`, { state: [...breadcrumbs, user] });
  };
  console.log(user);

  return (
    <Container>
      <Header>
        <ImgContainer>
          <Img src={user?.imageUrl} />
        </ImgContainer>

        <InfoContainer>
          <Fieldset>
            <Legend>Info</Legend>
            <Name>
              {user?.name} {user?.lastName}
            </Name>
            <Title>
              <i>{user?.title}</i>
            </Title>

            <Paragraph>
              <Underline>Email</Underline>: {user?.email}
            </Paragraph>
            <Paragraph>
              <Underline>Ip Address</Underline>: {user?.ip}
            </Paragraph>
            <Paragraph>
              <Underline>Ip Address</Underline>: {user?.ip}
            </Paragraph>
            <Paragraph>
              <Underline>Job Area</Underline>: {user?.jobArea}
            </Paragraph>
            <Paragraph>
              <Underline>Job Type</Underline>: {user?.jobType}
            </Paragraph>
          </Fieldset>
        </InfoContainer>

        <AddressContainer>
          <Fieldset>
            <Legend>Address</Legend>
            <Paragraph>
              <Strong>
                {user?.company.name} {user?.company.suffix}
              </Strong>
            </Paragraph>
            <Paragraph>
              <Underline>City</Underline>: {user?.address.city}
            </Paragraph>
            <Paragraph>
              <Underline>Country</Underline>: {user?.address.country}
            </Paragraph>
            <Paragraph>
              <Underline>State</Underline>: {user?.address.state}
            </Paragraph>
            <Paragraph>
              <Underline>Street Address</Underline>:{" "}
              {user?.address.streetAddress}
            </Paragraph>
            <Paragraph>
              <Underline>ZIP</Underline>: {user?.address.zipCode}
            </Paragraph>
          </Fieldset>
        </AddressContainer>
      </Header>

      <BreadCrumbsContainer>
        {breadcrumbs?.map((user, index) => (
          <NavLink to={`/user/${user.id}`} state={breadcrumbs.slice(0, index)}>
            {user.name} {" > "}
            {user.lastName}
          </NavLink>
        ))}
      </BreadCrumbsContainer>

      <FriendsContainer>
        <H3>Friends:</H3>
        <UsersFriends userId={id} onNavigate={handleFriendClick} />
      </FriendsContainer>
    </Container>
  );
}

export default UserDetails;

const Container = styled.div`
  border: 1px solid #ccc;
`;

const FriendsContainer = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media only screen and (min-width: 991px) {
    flex-direction: row;
    align-items: center;
  }
`;

const BreadCrumbsContainer = styled.div`
  padding: 20px;
`;
const InfoContainer = styled.div`
  flex: 1;
  @media only screen and (min-width: 991px) {
    margin-left: 20px;
  }
`;

const AddressContainer = styled(InfoContainer)`
  @media only screen and (min-width: 991px) {
    max-width: 200px;
    margin-left: 2px;
  }
`;

const ImgContainer = styled.div``;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 200px;
`;

const Fieldset = styled.fieldset`
  padding: 0 12px 12px 12px;
`;

const Legend = styled.legend``;

const Name = styled.h2`
  font-size: 16px;
`;

const Title = styled.p`
  margin-bottom: 10px;
`;

const Paragraph = styled.p``;

const Underline = styled.u``;

const Strong = styled.strong``;

const H3 = styled.h3`
  font-size: 24px;
  margin: 20px 0 20px 10px;
`;
