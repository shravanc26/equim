import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/LeftPanel.module.css'
import Link from 'next/link'


type Comment = {
  id: number;
  content: string;
  user: {
      image: string;
      name: string;
      username: string;
  };
  replies?: Reply[]; // Optional array of replies
};

type Reply = {
  content: string;
  replyingTo: string;
  user: {
      image: string;
      name: string;
      username: string;
  };
};

type ProductRequest = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Comment[];
};

type UserData = {
  currentUser: {
      image: string;
      name: string;
      username: string;
  };
  productRequests: ProductRequest[];
};
export default function Leftpanel() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [data, setData] = useState<UserData | null>(null);
  useEffect(() => {
      const dataString = localStorage.getItem("data");
      if (dataString) {
          setData(JSON.parse(dataString));
      }
  }, [])
  console.log(data)
  const liveProducts = data?.productRequests.filter(item => item.status === "live");
  const inProgressProducts = data?.productRequests.filter(item => item.status === "in-progress");
  const plannedProducts = data?.productRequests.filter(item => item.status === "planned");
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
    console.log(showNavbar)
  }
  return (
    <div className={styles.flex}>
      <div style={{ borderRadius: 5, width: 255, }} className={styles.divsTabs}>
        <Image
          src="/assets/suggestions/desktop/background-header.png"
          alt="My Image"
          width={255}
          height={137}
          className={styles.imgTab}
        />
        <span className={styles.equim}>
          Equim
        </span>
        <span className={styles.fbb}>
          Feedback Board
        </span>
      </div>
      <div className={`${styles.container} ${styles.divsTabs}`}>
        <div className={styles.mainContainer}>
          <div className={`${styles.box} ${styles.active}`}>
            <span className={styles.textBox}>All</span>
          </div>
          <div className={`${styles.box} `}>
            <span className={styles.colorText}>UI</span>
          </div>
          <div className={`${styles.box}`}>
            <span className={styles.colorText}>UX</span>
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={`${styles.box} `}>
            <span className={styles.colorText}>Enhancement</span>
          </div>
          <div className={`${styles.box}`}>
            <span className={styles.colorText}>Bug</span>
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={`${styles.box} `}>
            <span className={styles.colorText}>Feature</span>
          </div>
        </div>
      </div>
      <div className={`${styles.container} ${styles.divsTabs}`}>
        <Link href="roadmap">
        <div className={styles.cont1}>
          <span className={styles.boldText}>
            Roadmap
          </span>
          <span className={styles.linkText}>
            view
          </span>
        </div>
        </Link>
        <div style={{ marginTop: '24px' }}>
          <div className={styles.cont1}>
            <div className={styles.cont2}>
              <div className={styles.orangeCircle}></div>
              <span className={styles.text}>
                Planned
              </span>
            </div>
            <span className={styles.boldText}>
            {plannedProducts?.length}
            </span>
          </div>
          <div className={styles.cont1}>
            <div className={styles.cont2}>
              <div className={styles.purpleCircle}></div>
              <span className={styles.text}>
                In-Progress
              </span>
            </div>
            <span className={styles.boldText}>
            {inProgressProducts?.length}
            </span>
          </div>
          <div className={styles.cont1}>
            <div className={styles.cont2}>
              <div className={styles.blueCircle}></div>
              <span className={styles.text}>
                Live
              </span>
            </div>
            <span className={styles.boldText}>
            {liveProducts?.length}
            </span>
          </div>
        </div>
      </div>
      <div onClick={handleShowNavbar}>
        <Image
          className={styles.imgMobile}
          src="/assets/shared/hamburger.svg"
          alt="My Image"
          width={18}
          height={16}
        />
      </div>

      <div className={styles.divsTabs1}>
        <Image
          src="/assets/suggestions/desktop/background-header.png"
          alt="My Image"
          width={255}
          height={178}
          className={styles.imgTab}
        />
        <span className={styles.equim}>
          Equim
        </span>
        <span className={styles.fbb}>
          Feedback Board
        </span>
      </div>
    {
      showNavbar && <div className={styles.fade}></div>
    }

      {
        showNavbar && <div className={`${styles.navElements}`}>
          <div className={`${styles.container} ${styles.divsTabs2}`}>
            <div className={styles.mainContainer}>
              <div className={`${styles.box} ${styles.active}`}>
                <span className={styles.textBox}>All</span>
              </div>
              <div className={`${styles.box} `}>
                <span className={styles.colorText}>UI</span>
              </div>
              <div className={`${styles.box}`}>
                <span className={styles.colorText}>UX</span>
              </div>
            </div>
            <div className={styles.mainContainer}>
              <div className={`${styles.box} `}>
                <span className={styles.colorText}>Enhancement</span>
              </div>
              <div className={`${styles.box}`}>
                <span className={styles.colorText}>Bug</span>
              </div>
            </div>
            <div className={styles.mainContainer}>
              <div className={`${styles.box} `}>
                <span className={styles.colorText}>Feature</span>
              </div>
            </div>
          </div>
          <div className={`${styles.container} ${styles.divsTabs2}`}>
            <Link href="roadmap">
            <div className={styles.cont1}>
              <span className={styles.boldText}>
                Roadmap
              </span>
              <span className={styles.linkText}>
                view
              </span>
            </div>
            </Link>
            <div style={{ marginTop: '24px' }}>
              <div className={styles.cont1}>
                <div className={styles.cont2}>
                  <div className={styles.orangeCircle}></div>
                  <span className={styles.text}>
                    Planned
                  </span>
                </div>
                <span className={styles.boldText}>
                  2
                </span>
              </div>
              <div className={styles.cont1}>
                <div className={styles.cont2}>
                  <div className={styles.purpleCircle}></div>
                  <span className={styles.text}>
                    In-Progress
                  </span>
                </div>
                <span className={styles.boldText}>
                  2
                </span>
              </div>
              <div className={styles.cont1}>
                <div className={styles.cont2}>
                  <div className={styles.blueCircle}></div>
                  <span className={styles.text}>
                    Live
                  </span>
                </div>
                <span className={styles.boldText}>
                  2
                </span>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}
