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

# Object transformations

There are for properties to transform objects:

- position (move around)
- scale (resize)
- rotation (rotate)
- quaternion (also rotate but different)

ALl of them inherit from the Object3D class

> Units are arbitrary, position of 1 can mean 1 meter, cm or Km. you need to adapt it to what you want to build

**position** property is not any object but a instance of the _Vector3_ class which has some other methods like

- `length()`
- `distance(another Vec3 Object)`
- `normalize()` direction reduce lenght of vectors to 1 but keep
- `set(x,y,z)`

### Axes helper

Its a helper class in charge of displaying each axe orientation and position on the current space

### Scale

Scale is also a vector3, with xyz defaulted in 1

### Rotation

Rotation can be accessed either by `rotation` or `quaternion`

The first one its an Euler object, and its expressed in radians

- If you spin on the y axis, you can picture it like a carousel.
- If you spin on the x axis, you can imagine that you are rotating the wheels of a car you'd be in.
- And if you rotate on the z axis, you can imagine that you are rotating the propellers in front of an aircraft you'd be in.

This type of rotation can be dangerous because the order of the rotation matters and its applied in x,y,z so one rotation might not take effect
although the order can be changed.

In order to avoid side effects the method Quaternion is used for rotation

> The command camera.lookAt(Vector 3) makes the camera look at something

### Group Class

Group class inherits from Object3D so it has the same methods `position`, `scale`, `rotation`, `quaternion`

# Animations
