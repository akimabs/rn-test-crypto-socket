# Test - Mobile Developer

I have been inspired to create a scrollable UI chart that allows users to view historical prices. Additionally, I am considering for the future combining indicators with the built-in SVG line chart to integrate them into the react-native-wagmi-charts package through patch-package.

And i have encountered a rather challenging issue with the react-native-wagmi-charts package. Its components have not been optimized, such as using memoization for primitive data types like arrays.

<img src="https://user-images.githubusercontent.com/46390089/268562535-e839fabd-ebff-42c6-b5c6-020d7e29a19a.png" width="300">

Consequently, there is a noticeable drop in frames per second (FPS), roughly around 15-30 FPS when updating the chart via a socket.

<img src="https://user-images.githubusercontent.com/46390089/268562337-f21e0110-d2b1-4907-aa79-564c5abb6753.jpg" width="300">

And rather issue can make me interest is determining how to calculate the All-Time High (ATH) and minimum price on the chart. It may still be far from perfection at this stage, but I am committed to further improving my knowledge of crypto-related matters in the future.

Thanks for reading this :D
