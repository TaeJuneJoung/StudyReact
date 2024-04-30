# React Animation

## CSS 기본 애니메이션

```css
/* 화살표 방향 변경 애니메이션 */
.challenge-item-details-icon {
  display: inline-block;
  font-size: 0.85rem;
  margin-left: 0.25rem;
  transition: transform 0.3s ease-out;
}

.challenge-item-details.expanded .challenge-item-details-icon {
  transform: rotate(180deg);
}

/* 모달창 뜨는 애니메이션 */
.modal {
  top: 10%;
  border-radius: 6px;
  padding: 1.5rem;
  width: 30rem;
  max-width: 90%;
  z-index: 10;
  animation: slide-up-face-in 0.3s ease-out forwards;
}

@keyframes slide-up-face-in {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## 프레이머 모션

```bash
npm install framer-motion
```

### 화살표 방향 변경 애니메이션

```jsx
// ChallengeItem.jsx
import { useContext } from "react";
import { motion } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";

export default function ChallengeItem({
  challenge,
  onViewDetails,
  isExpanded,
}) {
  const { updateChallengeStatus } = useContext(ChallengesContext);

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  function handleCancel() {
    updateChallengeStatus(challenge.id, "failed");
  }

  function handleComplete() {
    updateChallengeStatus(challenge.id, "completed");
  }

  return (
    <li>
      <article className="challenge-item">
        <header>
          <img {...challenge.image} />
          <div className="challenge-item-meta">
            <h2>{challenge.title}</h2>
            <p>Complete until {formattedDate}</p>
            <p className="challenge-item-actions">
              <button onClick={handleCancel} className="btn-negative">
                Mark as failed
              </button>
              <button onClick={handleComplete}>Mark as completed</button>
            </p>
          </div>
        </header>
        <div
          className={`challenge-item-details ${
            isExpanded ? "expanded" : undefined
          }`}
        >
          <p>
            <button onClick={onViewDetails}>
              View Details{" "}
              <motion.span
                className="challenge-item-details-icon"
                animate={{ rotate: isExpanded ? 180 : 0 }}
              >
                &#9650;
              </motion.span>
            </button>
          </p>

          {isExpanded && (
            <div>
              <p className="challenge-item-description">
                {challenge.description}
              </p>
            </div>
          )}
        </div>
      </article>
    </li>
  );
}
```

### 모달창 애니메이션

```jsx
// Modal.jsx
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
```

`initial`로 인하여 초기 상태에 대한 값을 줄 수 있다.

`exit` DOM에서 삭제될 때 애니메이션

이렇게만 작성하면 애니메이션이 동작하지 않는다. 그 이유는 Header.jsx에서 `{isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}` DOM에서 삭제되면서 바로 안보이게 처리해놨기 때문이다.

```jsx
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <button onClick={handleStartAddNewChallenge} className="button">
          Add Challenge
        </button>
      </header>
    </>
  );
}
```

`AnimatePresence`가 래퍼역할을 하면서 안에 들어가 있는 요소에 대해서 exit 애니메이션이 있는 요소가 있는지 확인하고 있다면 exit 애니메이션부터 실행한 뒤 삭제가 되게 한다.

```js
<motion.button
  whileHover={{ scale: 1.1 }}
  transition={{ type: "spring", stiffness: 500 }}
  onClick={handleStartAddNewChallenge}
  className="button"
>
  Add Challenge
</motion.button>
```

- type: 'spring' -> 팅겨져 나오는
- stiffness: 스프링의 강도

### 스태거링 효과

```js
<motion.ul
  id="new-challenge-images"
  variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
>
  {images.map((image) => (
    <motion.li
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
      }}
      exit={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring" }}
      key={image.alt}
      onClick={() => handleSelectImage(image)}
      className={selectedImage === image ? "selected" : undefined}
    >
      <img {...image} />
    </motion.li>
  ))}
</motion.ul>
```

ui요소에 `staggerChildren`효과를 줘서 안에 있는 li요소들이 나타날 때의 간격텀을 주었다.

li요소에서는 나타날 때와 사라질 때 효과를 주었는데 Modal안에 있는 내용들(children)이지만 래핑되어 있어서 부모의 `variants`값을 적용받는다. 그래서 마지막에 `exit={{ opacity: 1, scale: 1 }}`를 두어서 Modal에서 사용한 exit로 인하여 닫히는 속도가 딜레이 되지 않게 작성하였다. variants에 visible의 값을 작성한 것이 아닌 값을 작성한 이유는 Framer-Motion의 현재 버전(11.1.1)에서는 에러인지 적용이 안되어 아직은 저렇게 작성해야한다고 한다.

> 그러기엔 Modal에서는 되었는데... 물려받은 속성과 충돌이 나는 것인가?

```js
<motion.button
  whileHover={{ scale: 1.1, backgroundColor: "#8b11f0" }}
  transition={{ type: "spring", stiffness: 500 }}
  onClick={handleStartAddNewChallenge}
  className="button"
>
  Add Challenge
</motion.button>
```

색상이 변경되게도 할 수 있고, `keyframes`처럼 동작하게 배열로 작성할 수도 있다.

```js
<motion.li
  variants={{
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: [0.8, 1.3, 1] },
  }}
  exit={{ opacity: 1, scale: 1 }}
  transition={{ type: "spring" }}
  key={image.alt}
  onClick={() => handleSelectImage(image)}
  className={selectedImage === image ? "selected" : undefined}
>
  <img {...image} />
</motion.li>
```

이렇게 하면 된다고 하는데 이거는 별로 와닿지 않는다.

🤔TODO: keyframes 사용법에 대해서 살펴보기

```jsx
// NewChallenge.jsx
import { useContext, useRef, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      animate(
        "input, textarea",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          id="new-challenge-images"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
```

`useAnimate`를 사용함으로서 여기서는 틀렸을 때 input창과 textare창에 애니메이션을 주었다.

`stagger`은 각 요소들의 간격텀을 주기 위해서 사용

🤔TODO: useAnimate란?

```jsx
// ChallengeItem.jsx
import { useContext } from "react";
import { motion } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";

export default function ChallengeItem({
  challenge,
  onViewDetails,
  isExpanded,
}) {
  const { updateChallengeStatus } = useContext(ChallengesContext);

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  function handleCancel() {
    updateChallengeStatus(challenge.id, "failed");
  }

  function handleComplete() {
    updateChallengeStatus(challenge.id, "completed");
  }

  return (
    <motion.li layout>
      <article className="challenge-item">
        <header>
          <img {...challenge.image} />
          <div className="challenge-item-meta">
            <h2>{challenge.title}</h2>
            <p>Complete until {formattedDate}</p>
            <p className="challenge-item-actions">
              <button onClick={handleCancel} className="btn-negative">
                Mark as failed
              </button>
              <button onClick={handleComplete}>Mark as completed</button>
            </p>
          </div>
        </header>
        <div
          className={`challenge-item-details ${
            isExpanded ? "expanded" : undefined
          }`}
        >
          <p>
            <button onClick={onViewDetails}>
              View Details{" "}
              <motion.span
                className="challenge-item-details-icon"
                animate={{ rotate: isExpanded ? 180 : 0 }}
              >
                &#9650;
              </motion.span>
            </button>
          </p>

          {isExpanded && (
            <div>
              <p className="challenge-item-description">
                {challenge.description}
              </p>
            </div>
          )}
        </div>
      </article>
    </motion.li>
  );
}
```

`layout`을 통해서 아이템 요소가 2개 이상일 때 하나가 다른 곳으로 가거나 삭제되면 애니메이션적으로 처리됨.

🤔TODO: layout 기능은?

```jsx
// Challenges.jsx
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import ChallengeItem from "./ChallengeItem.jsx";
import ChallengeTabs from "./ChallengeTabs.jsx";

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState("active");
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === "active"),
    completed: challenges.filter(
      (challenge) => challenge.status === "completed"
    ),
    failed: challenges.filter((challenge) => challenge.status === "failed"),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        <AnimatePresence mode="wait">
          {displayedChallenges.length > 0 && (
            <motion.ol
              key="list"
              exit={{ y: -30, opacity: 0 }}
              className="challenge-items"
            >
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}
          {displayedChallenges.length === 0 && (
            <motion.p
              key="fallback"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              No challenges found.
            </motion.p>
          )}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
```

`AnimatePresence`을 2개 쓰게 되어서 어떠한 요소인지 분별할 수 있게 `key`를 두어야 한다.

`mode=wait`로 설정해야 아무 요소도 없을 때 나오는 `motion.p`의 'No challenges found.'값을 이후에 나오게 할 수 있다.(기본값은 `sync`)

**layout으로 인한 애니메이션으로 일렁거림 없애기**

```js
<AnimatePresence>
  {isExpanded && (
    <motion.div
      variants={{
        hidden: { height: 0, opacity: 0 },
        visible: { height: "auto", opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <p className="challenge-item-description">{challenge.description}</p>
    </motion.div>
  )}
</AnimatePresence>
```

layout으로 인하여 자동으로 애니메이션이 들어가서 펼쳐볼 때 이미지도 일렁거리면서 커지는 현상이 발생하는데 이를 업생기 위해서 다음과 같이 처리하였다.

**탭 bar 애니메이션**

```js
// ChallengeTabs.jsx
<motion.div layoutId="tab-indicator" className="active-tab-indicator" />
```

`layoutId`값에 tab-indicator을 주니 애니메이션이 적용되었다.

🤔TODO: layoutId 기능은?
