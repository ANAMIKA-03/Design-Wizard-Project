import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

const SizeUl = styled.ul`
  margin: 0 0 0 0;
  padding: 0;
  list-style: none;
  width: 707px;
`;

const SizeList = styled.li`
  padding: 15px;
  display: inline-grid;
  align-items: center;
  width: 28%;
`;

const SizePostComman = styled.div`
  // width: 150px;
  height: 90px;
  margin: 25px auto 0;
  cursor: pointer;
  outline: 0 none;
  display: inline-grid;
  align-items: center;
  text-align: center;
  transform-origin: 0 0;
  padding: 0 10px;
  border: 2px solid #592e6f;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translate3d(0, -10px, 0);
  }
`;

const SizeFacebookCover = styled.div`
  // width: 150px;
  height: 70px;
  margin: 25px auto 0;
  cursor: pointer;
  outline: 0 none;
  transform-origin: 0 0;
  display: inline-grid;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  border: 2px solid #592e6f;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translate3d(0, -10px, 0);
  }
`;

const InstaImg = styled.div`
  // width: 150px;
  height: 170px;
  margin: 25px auto 0;
  cursor: pointer;
  outline: 0 none;
  transform-origin: 0 0;
  display: inline-grid;
  align-items: center;
  padding: 0 10px;
  text-align: center;
  border: 2px solid #592e6f;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translate3d(0, -10px, 0);
  }
`;

const BannerImg = styled.div`
  // width: 150px;
  height: 30px;
  margin: 25px auto 0;
  cursor: pointer;
  outline: 0 none;
  transform-origin: 0 0;
  display: inline-grid;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  border: 2px solid #592e6f;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translate3d(0, -10px, 0);
  }
`;

const PinImg = styled.div`
  // width: 100px;
  height: 150px;
  margin: 25px auto 0;
  cursor: pointer;
  outline: 0 none;
  transform-origin: 0 0;
  display: inline-grid;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  border: 2px solid #592e6f;
  box-shadow: rgb(0 0 0 / 40%) 0 23px 24px -12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translate3d(0, -10px, 0);
  }
`;

const SizeText = styled.span`
  color: #592e6f;
  text-align: center;
  font-size: 14px;
  display: block;
`;

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        style={{ maxWidth: "500px", overflow: "inherit" }}
      >
        <Tab
          style={{ textTransform: "capitalize", maxWidth: "450px" }}
          label="Social Media"
          {...a11yProps(0)}
        />
        <Tab
          style={{ textTransform: "capitalize", maxWidth: "450px" }}
          label="Cards & Invitations"
          {...a11yProps(1)}
        />
        <Tab
          style={{ textTransform: "capitalize", maxWidth: "450px" }}
          label="Marketing Materials"
          {...a11yProps(2)}
        />
        <Tab
          style={{ textTransform: "capitalize", maxWidth: "450px" }}
          label="Blog & Email"
          {...a11yProps(3)}
        />
        <Tab
          style={{ textTransform: "capitalize", maxWidth: "450px" }}
          label="Ads"
          {...a11yProps(4)}
        />
        <Tab
          style={{ textTransform: "capitalize", maxWidth: "450px" }}
          label="Posters"
          {...a11yProps(5)}
        />
        <Tab
          style={{ textTransform: "capitalize", maxWidth: "450px" }}
          label="Books / Covers"
          {...a11yProps(6)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SizeUl>
          <SizeList>
            <InstaImg>
              <SizeText>Facebook ads</SizeText>
            </InstaImg>
          </SizeList>
          <SizeList>
            <BannerImg>
              <SizeText>Facebook ads</SizeText>
            </BannerImg>
          </SizeList>
          <SizeList>
            <PinImg>
              <SizeText>Facebook ads</SizeText>
            </PinImg>
          </SizeList>
        </SizeUl>
        <SizeUl>
          <SizeList>
            <SizePostComman>
              <SizeText>Facebook post</SizeText>
            </SizePostComman>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook cover</SizeText>
            </SizeFacebookCover>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook ads</SizeText>
            </SizeFacebookCover>
          </SizeList>
        </SizeUl>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SizeUl>
          <SizeList>
            <InstaImg>
              <SizeText>Facebook ads</SizeText>
            </InstaImg>
          </SizeList>
          <SizeList>
            <BannerImg>
              <SizeText>Facebook ads</SizeText>
            </BannerImg>
          </SizeList>
          <SizeList>
            <PinImg>
              <SizeText>Facebook ads</SizeText>
            </PinImg>
          </SizeList>
        </SizeUl>
        <SizeUl>
          <SizeList>
            <SizePostComman>
              <SizeText>Facebook post</SizeText>
            </SizePostComman>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook cover</SizeText>
            </SizeFacebookCover>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook ads</SizeText>
            </SizeFacebookCover>
          </SizeList>
        </SizeUl>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SizeUl>
          <SizeList>
            <InstaImg>
              <SizeText>Facebook ads</SizeText>
            </InstaImg>
          </SizeList>
          <SizeList>
            <BannerImg>
              <SizeText>Facebook ads</SizeText>
            </BannerImg>
          </SizeList>
          <SizeList>
            <PinImg>
              <SizeText>Facebook ads</SizeText>
            </PinImg>
          </SizeList>
        </SizeUl>
        <SizeUl>
          <SizeList>
            <SizePostComman>
              <SizeText>Facebook post</SizeText>
            </SizePostComman>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook cover</SizeText>
            </SizeFacebookCover>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook ads</SizeText>
            </SizeFacebookCover>
          </SizeList>
        </SizeUl>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SizeUl>
          <SizeList>
            <InstaImg>
              <SizeText>Facebook ads</SizeText>
            </InstaImg>
          </SizeList>
          <SizeList>
            <BannerImg>
              <SizeText>Facebook ads</SizeText>
            </BannerImg>
          </SizeList>
          <SizeList>
            <PinImg>
              <SizeText>Facebook ads</SizeText>
            </PinImg>
          </SizeList>
        </SizeUl>
        <SizeUl>
          <SizeList>
            <SizePostComman>
              <SizeText>Facebook post</SizeText>
            </SizePostComman>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook cover</SizeText>
            </SizeFacebookCover>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook ads</SizeText>
            </SizeFacebookCover>
          </SizeList>
        </SizeUl>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SizeUl>
          <SizeList>
            <InstaImg>
              <SizeText>Facebook ads</SizeText>
            </InstaImg>
          </SizeList>
          <SizeList>
            <BannerImg>
              <SizeText>Facebook ads</SizeText>
            </BannerImg>
          </SizeList>
          <SizeList>
            <PinImg>
              <SizeText>Facebook ads</SizeText>
            </PinImg>
          </SizeList>
        </SizeUl>
        <SizeUl>
          <SizeList>
            <SizePostComman>
              <SizeText>Facebook post</SizeText>
            </SizePostComman>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook cover</SizeText>
            </SizeFacebookCover>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook ads</SizeText>
            </SizeFacebookCover>
          </SizeList>
        </SizeUl>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <SizeUl>
          <SizeList>
            <InstaImg>
              <SizeText>Facebook ads</SizeText>
            </InstaImg>
          </SizeList>
          <SizeList>
            <BannerImg>
              <SizeText>Facebook ads</SizeText>
            </BannerImg>
          </SizeList>
          <SizeList>
            <PinImg>
              <SizeText>Facebook ads</SizeText>
            </PinImg>
          </SizeList>
        </SizeUl>
        <SizeUl>
          <SizeList>
            <SizePostComman>
              <SizeText>Facebook post</SizeText>
            </SizePostComman>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook cover</SizeText>
            </SizeFacebookCover>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook ads</SizeText>
            </SizeFacebookCover>
          </SizeList>
        </SizeUl>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <SizeUl>
          <SizeList>
            <InstaImg>
              <SizeText>Facebook ads</SizeText>
            </InstaImg>
          </SizeList>
          <SizeList>
            <BannerImg>
              <SizeText>Facebook ads</SizeText>
            </BannerImg>
          </SizeList>
          <SizeList>
            <PinImg>
              <SizeText>Facebook ads</SizeText>
            </PinImg>
          </SizeList>
        </SizeUl>
        <SizeUl>
          <SizeList>
            <SizePostComman>
              <SizeText>Facebook post</SizeText>
            </SizePostComman>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook cover</SizeText>
            </SizeFacebookCover>
          </SizeList>
          <SizeList>
            <SizeFacebookCover>
              <SizeText>Facebook ads</SizeText>
            </SizeFacebookCover>
          </SizeList>
        </SizeUl>
      </TabPanel>
    </div>
  );
}
