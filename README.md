# Trackmania Club Image Processor

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This React-based image processing tool lets users upload an image, select a crop area, and export it in predefined sizes for Trackmania Club assets. It supports different aspect ratios and resolutions to accommodate various club images like logos, decals, and backgrounds.

## Features

- **Multiple Output Variations**: Export images in predefined sizes, including logo, decals, vertical shots, and screen backgrounds.
- **Flexible Aspect Ratios**: Each variation has an aspect ratio and resolution suited for specific uses.
- **Download in Multiple Formats**: Supports download options in PNG and JPEG formats.
- **Interactive Crop Tool**: Adjust and crop images to fit the required aspect ratio and resolution.

## Getting Started

The app will be available at `https://trackmania-club.netlify.app`.

## Usage

1. **Upload an Image**: Click the **Upload Your Image** button to select an image from your device.
2. **Adjust the Crop Area**: Drag over the image to select the desired crop area.
3. **Generate Image**: Choose a specific image variation (e.g., Logo, Decal) to generate a processed image.
4. **Download**: After processing, click the **Download** button to save the image in the selected format.

## Image Variations

Each variation has predefined dimensions and aspect ratios:

- **Logo**: 256x256 (1:1 aspect ratio)
- **Decal**: 1024x1024 (1:1 aspect ratio)
- **Decal Sponsor**: 1024x256 (4:1 aspect ratio)
- **Vertical**: 720x928 (45:58 aspect ratio)
- **Screen 16:9**: 1920x1080 (16:9 aspect ratio)
- **Screen 8:1**: 2048x256 (8:1 aspect ratio)
- **Screen 16:1**: 4096x256 (16:1 aspect ratio)
- **Background**: 1920x1080 (16:9 aspect ratio)

## Technologies Used

- **React**: Component-based UI library
- **React Crop**: Cropper library for selecting and adjusting image crops
- **FileSaver.js**: For saving processed images
- **TailwindCSS** (optional): Styling for the UI components

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by [MaikeruDev](https://github.com/MaikeruDev). (Ingame: Maikeru_TM - Discord: maikeru.dev) Feel free to reach out for any questions or contributions!
 
