#include<iostream>
#include<cstdio>
#include<cmath>

using namespace std;
typedef long long ll;
ll *aux;
ll *v;

ll CountandSort(int lo,int mid, int hi)
{
    int k=0,m = hi-lo+1;
    int i=lo,j=mid+1;
    ll ans =0;
    while(k<m)
    {
        if((i<=mid && j<=hi && v[i]<=v[j] ) || j>hi )
            aux[k++] = v[i++];
        else if(j<=hi || i>mid){
            if(i<=mid)
                ans +=(mid - lo + 1) - (i-lo);//Tamaño del vector izquierdo - lo que he avanzado en i
            aux[k++] = v[j++];
        }
    }
    for(int i=0;i<m;i++)
        v[lo++] = aux[i];
    return ans;
}

ll CountInversions(int lo,int hi)
{
    if(lo>=hi) return 0;
    int mid = (hi+lo)/2;
    ll left = CountInversions(lo,mid);
    ll right = CountInversions(mid+1,hi);
    ll cross = CountandSort(lo,mid,hi);
    return left + right + cross;
}
int main()
{
    int n;
    cin>>n;
    aux = new ll[n];
    v = new ll[n];
    for(int i=0;i<n;cin>>v[i++]);
    cout<<CountInversions(0,n-1)<<endl;
    return 0;
}
