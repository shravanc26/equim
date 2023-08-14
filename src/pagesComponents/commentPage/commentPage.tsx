import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Comment.module.css'

interface Comment {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
}

interface CommentPageProps {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies?: Comment[] | undefined;
  totComments: number;
}

const CommentPage: React.FC<CommentPageProps> = ({ id, content, user, replies }) => {
  console.log(id, content, user, replies);
  return (
    <div>
      <div className={styles.cardContainer}>
        <div className={styles.flexContainer}>
          <div >
            <Image
              src={user.image.substring(1)}
              alt="My Image"
              width={40}
              height={40}
              className={styles.img1}
            />
          </div>
          <div className={styles.flexColumn}>
            <div>
              <span className={styles.boldText}>
                {user.name}
              </span>
            </div>
            <div>
              <span className={`${styles.textDesc} ${styles.align1}`}>
                @{user.username}
              </span>
            </div>
            <div >
              <span className={styles.textDesc}>
                {content}
              </span>
            </div>
          </div>
        </div>
        <div >
          <span className={styles.colorText}>Reply</span>
        </div>
      </div>
      <span className={styles.textDesc1}>
        {content}
      </span>
      {
        replies && replies.map((reply) => {
          return <div  key={reply.id}>
            <div className={`${styles.cardContainer} ${styles.decWidth}`}>
              <div className={styles.flexContainer}>
                <div >
                  <Image
                    src={reply.user.image.substring(1)}
                    alt="My Image"
                    width={40}
                    height={40}
                  // className={}
                  />
                </div>
                <div className={styles.flexColumn}>
                  <div>
                    <span className={styles.boldText}>
                      {reply.user.name}
                    </span>
                  </div>
                  <div>
                    <span className={`${styles.textDesc} ${styles.align1}`}>
                      @{reply.user.username}
                    </span>
                  </div>
                  <div >
                    <span className={styles.textDesc}>
                      {reply.content}
                    </span>
                  </div>
                </div>
              </div>
              <div >
                <span className={styles.colorText}>Reply</span>
              </div>
            </div>
            <span className={`${styles.textDesc1} ${styles.temp}`}>
              {content}
            </span>
          </div>

        })
      }
    </div>
  );
};

export default CommentPage;
