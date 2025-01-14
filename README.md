# Setting up NextJS With Redux toolkit

Install the packages to get started

```bash
npm install @reduxjs/toolkit react-redux @types/react-redux
```

**Create `redux folder` or put the redux in lib**

Create a `store.ts` file at the root of the folder

Paste the following code in the store.ts file

```store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Create a folder, call it `features`. It is going to all the slices.
Then create a `counterSlice.ts` folder.

```counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default counterSlice.reducer;
```

In the redux folder, create a `hook.ts` to be used in the folder

```hook.ts
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

You then create the `provider.tsx` to be used in the layout file

```provider.tsx
"use client";

import { store } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

Go to the layout.tsx at the root of the file. Add

```
import { Providers } from "@/redux/provider";

  <Providers>
    <body className={inter.className}>{children}</body>
  </Providers>
```

You may then now use in your components. Check the example below

```custombutton.tsx
"use client";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { decrement, increment } from "../redux/features/counterSlice";

export function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
}
```
