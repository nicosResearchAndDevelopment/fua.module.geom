# module.geom / algorithms

## algo.covers.Line_Point

> __assume__ `L ∈ IR²` a point and `l ∈ IR²` a vector from that point \
> __assume__ `R ∈ IR²` another given point 
> 
> __let__ `t ∈ IR²`__,__ `t := (R - L) / l` \
> __if__ `t[0] = t[1]` __and__ `t ∈ [0, 1]²` __and__ `R = L + t * l` \
> __then__ `R` lies on the line from `L` in the direction and with the magnitude of `l`