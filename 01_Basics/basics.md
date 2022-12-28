# Basics

# What is WebGl

- Javascript API that renders using the visitor GPU

**Shaders** are in charge of calculating where to place the points of the geometries and draw the pixels within them

We can also provide data to shaders, such as, how to place the points according to transformations and the camera propperties, this transformatins are called **matrices**
And finally we need to provide data on how to colorize pixels, for example in the case of lighting

WebGl is hard because it does not provide any defalult elements such as shaders or matrices

**Three.js** is a library that works on top of webGl providing out of the box resources such as shaders and matrices

A **MESH** is a combination of geometry(shape) and material(texture/how it looks)

---

**CAMERA**s are not visible, there are the point from which we look at the, you can switch along cameras if you wish usually we just use one

There are different types of cameras but for now we use a perspective camera.

Its provided by two essential parameters

- Field of view (vo) -> How large your vision angle is

  > Small angles lead to a zooming effect while Large angles lead to distortion

- Aspect Ratio -> Width divided by height of the canvas

Objects count with multiple properties such as position (xyz), rotation and scale
